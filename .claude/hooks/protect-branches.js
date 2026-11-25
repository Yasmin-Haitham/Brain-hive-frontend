#!/usr/bin/env node
// PreToolUse hook for Bash: keeps AI agents off the long-lived branches.
// Protected: main (production), staging, dev. Agents work only on prefixed
// branches (feature/, bugfix/, hotfix/, chore/) and open PRs; only the PO merges.
// GitHub branch protection isn't available on private free-plan repos, so this is the guard.
//
// Blocks:  commits / merges / rebases / resets / cherry-picks / reverts / pulls (non-ff) on a
//          protected branch, pushes that target one, any force push, mirror/all/delete pushes,
//          creating branches without an allowed prefix, `gh pr merge`, merges via `gh api`.
// Exit code 2 = block (stderr is shown to Claude); exit 0 = allow.

const { execFileSync } = require('child_process');

const PROTECTED = ['main', 'master', 'staging', 'dev'];
const PREFIXES = ['feature/', 'bugfix/', 'hotfix/', 'chore/'];
const prefixOk = (name) => PREFIXES.some((p) => name.startsWith(p) && name.length > p.length);

function block(reason) {
  process.stderr.write(
    `BLOCKED by .claude/hooks/protect-branches.js: ${reason}\n` +
      'Work on a feature/, bugfix/, hotfix/ or chore/ branch and open a PR. Only the Product Owner merges into dev, staging and main.\n'
  );
  process.exit(2);
}

function currentBranch(cwd) {
  try {
    // symbolic-ref also works in a fresh repo with no commits yet.
    return execFileSync('git', ['symbolic-ref', '--short', 'HEAD'], {
      cwd: cwd || process.cwd(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return null; // not a git repo
  }
}

// Split a shell command into simple segments on && || ; | & and newlines.
// Not a full shell parser, but quoted strings are kept intact.
function segments(cmd) {
  const out = [];
  let cur = '';
  let quote = null;
  for (let i = 0; i < cmd.length; i++) {
    const c = cmd[i];
    if (quote) {
      cur += c;
      if (c === quote) quote = null;
      else if (c === '\\' && quote === '"' && i + 1 < cmd.length) cur += cmd[++i];
      continue;
    }
    if (c === '"' || c === "'") { quote = c; cur += c; continue; }
    if (c === ';' || c === '\n' || c === '|' || c === '&' || c === '(' || c === ')') {
      out.push(cur); cur = ''; continue;
    }
    cur += c;
  }
  out.push(cur);
  return out.map((s) => s.trim()).filter(Boolean);
}

function words(seg) {
  return (seg.match(/"[^"]*"|'[^']*'|\S+/g) || []).map((w) => w.replace(/^["']|["']$/g, ''));
}

const isProtected = (name) => PROTECTED.includes(name.replace(/^refs\/heads\//, ''));

function checkGit(args, branch) {
  // Skip global options: -C <path>, -c <k=v>, --git-dir=..., etc.
  let i = 0;
  while (i < args.length && args[i].startsWith('-')) {
    if (args[i] === '-C' || args[i] === '-c') i += 2;
    else i += 1;
  }
  const sub = args[i];
  const rest = args.slice(i + 1);
  const onMain = branch && isProtected(branch);

  // New branches must use an allowed prefix.
  if (['checkout', 'switch'].includes(sub)) {
    const flagIdx = rest.findIndex((a) => ['-b', '-B', '-c', '-C', '--create', '--force-create'].includes(a));
    if (flagIdx !== -1) {
      const name = rest[flagIdx + 1];
      if (name && !prefixOk(name)) block(`branch name \`${name}\` needs a prefix: ${PREFIXES.join(', ')}.`);
      return null;
    }
    const target = rest.find(isProtected);
    if (target) return { switchedTo: target }; // later commits in the same command count as on it
  }
  if (sub === 'branch' && rest.length && !rest[0].startsWith('-') && !rest.some(isProtected)) {
    if (!prefixOk(rest[0])) block(`branch name \`${rest[0]}\` needs a prefix: ${PREFIXES.join(', ')}.`);
  }

  if (['commit', 'merge', 'rebase', 'cherry-pick', 'revert', 'am', 'reset', 'pull'].includes(sub) && onMain) {
    // Allow harmless read-only/abort forms and fast-forward pulls of main.
    if (sub === 'pull' && rest.includes('--ff-only')) return null;
    if (rest.some((a) => ['--abort', '--quit'].includes(a))) return null;
    if (sub === 'reset') {
      // Unstaging (`git reset`, `git reset <path>`) is fine; moving main is not.
      const movesBranch = rest.some((a) => ['--hard', '--soft', '--mixed', '--keep', '--merge'].includes(a) ||
        /^(HEAD|@)([~^]|$)|^[0-9a-f]{7,40}$|^origin\//.test(a));
      if (!movesBranch) return null;
    }
    block(`\`git ${sub}\` while on \`${branch}\`.`);
  }

  if (sub === 'branch' && rest.some((a) => ['-D', '-d', '--delete', '-f', '--force', '-m', '-M'].includes(a)) && rest.some(isProtected)) {
    block('deleting, renaming or force-moving a protected branch.');
  }

  if (sub === 'push') {
    if (rest.some((a) => a === '-f' || a === '--force' || a.startsWith('--force-with-lease') || a === '--force-if-includes' || /^-[a-zA-Z]*f/.test(a))) {
      block('force push.');
    }
    if (rest.some((a) => ['--mirror', '--all', '--delete', '-d'].includes(a))) {
      block(`\`git push ${rest.find((a) => ['--mirror', '--all', '--delete', '-d'].includes(a))}\`.`);
    }
    const refspecs = rest.filter((a) => !a.startsWith('-')).slice(1); // drop remote name
    for (const spec of refspecs) {
      if (spec.startsWith('+')) block(`force refspec \`${spec}\`.`);
      const dst = spec.includes(':') ? spec.split(':').pop() : spec;
      if (isProtected(dst) || (dst === 'HEAD' && onMain)) block(`push to \`${dst}\`.`);
    }
    if (refspecs.length === 0 && onMain) block(`push while on \`${branch}\`.`);
  }
  return null;
}

function checkGh(args) {
  if (args[0] === 'pr' && args[1] === 'merge') block('`gh pr merge`.');
  if (args[0] === 'api' && args.some((a) => /\/merges?\b|\/pulls\/\d+\/merge/.test(a))) block('merge through `gh api`.');
  if (args[0] === 'repo' && ['delete', 'archive', 'edit'].includes(args[1])) block(`\`gh repo ${args[1]}\` (repository settings are the PO's).`);
}

function main() {
  let input = '';
  process.stdin.on('data', (d) => (input += d));
  process.stdin.on('end', () => {
    let data;
    try { data = JSON.parse(input); } catch { process.exit(0); }
    const cmd = data?.tool_input?.command;
    if (typeof cmd !== 'string') process.exit(0);

    let branch = currentBranch(data.cwd);
    for (const seg of segments(cmd)) {
      let w = words(seg);
      while (w.length && /^[A-Za-z_][A-Za-z0-9_]*=/.test(w[0])) w.shift(); // env assignments
      while (w.length && ['sudo', 'command', 'exec', 'time', 'nohup', 'env'].includes(w[0])) w.shift();
      if (!w.length) continue;
      const bin = w[0].split('/').pop();
      if (bin === 'git') {
        const r = checkGit(w.slice(1), branch);
        if (r && r.switchedTo) branch = r.switchedTo;
      } else if (bin === 'gh') {
        checkGh(w.slice(1));
      } else if (['bash', 'sh', 'zsh'].includes(bin) && w[1] === '-c' && w[2]) {
        // Re-check commands wrapped in `bash -c "..."`.
        for (const inner of segments(w[2])) {
          const iw = words(inner);
          if (iw[0] === 'git') checkGit(iw.slice(1), branch);
          if (iw[0] === 'gh') checkGh(iw.slice(1));
        }
      }
    }
    process.exit(0);
  });
}

main();
