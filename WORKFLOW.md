# How we work: an AI development team with a human Product Owner

Brain Hive is built by a team of AI agents (Claude Code) directed by a human Product Owner (PO). The PO decides **what** gets built and approves every change. The agents plan, build, test and review. The setup is reusable for other full-stack projects: copy `.claude/` and this file, then adjust the agent descriptions to the new codebase.

## Two repos

| Repo | What | Agents in it |
|---|---|---|
| [`Brain-hive-backend`](https://github.com/Yasmin-Haitham/Brain-hive-backend) | Express + MongoDB API | tech-lead, backend-dev, qa-engineer, devops, reviewer |
| [`Brain-hive-frontend`](https://github.com/Yasmin-Haitham/Brain-hive-frontend) | React web client | tech-lead, frontend-dev, qa-engineer, devops, reviewer |

Both repos share this workflow, the same branch model and the same story keys. A story that needs both an API and a UI change gets one PR in each repo; the backend PR merges first, and API changes stay backward compatible because the two deploy separately. The project plan lives in `Brain-hive-backend/PROJECT_PLAN.md` until the Jira board replaces it.

## The team

| Agent | File | Owns |
|---|---|---|
| Tech lead | `.claude/agents/tech-lead.md` | Breaks a story into tasks, defines how "done" is checked, writes PR descriptions. Plans only. |
| Backend dev | `.claude/agents/backend-dev.md` | Backend repo: Express routes, Mongoose schemas, auth, sessions |
| Frontend dev | `.claude/agents/frontend-dev.md` | Frontend repo: React components, routing, forms, styling |
| QA engineer | `.claude/agents/qa-engineer.md` | Tests: Jest + Supertest, React Testing Library, Playwright |
| DevOps | `.claude/agents/devops.md` | Docker, GitHub Actions CI, deploy config |
| Reviewer | `.claude/agents/reviewer.md` | Read-only review of every branch before its PR |

The main Claude session is the **orchestrator**: it takes a story, asks the tech lead for a plan, hands each task to the right specialist, and runs the reviewer before opening the PR. (Subagents can't start other subagents, so coordination always goes through the main session.)

## Branches

Each repo has three long-lived branches, and nobody (human or agent) commits to them directly:

| Branch | What it is | Gets changes from |
|---|---|---|
| `dev` | Integration: the latest finished work | PRs from `feature/`, `bugfix/`, `chore/` branches |
| `staging` | Release candidate, deployed to the staging environment for the PO to try | A release PR `dev` → `staging` |
| `main` | Production: what's live | A release PR `staging` → `main`, or a `hotfix/` PR |

Short-lived work branches, named `<prefix>/<STORY-KEY>-<short-description>`:

| Prefix | Use for | Branch from | PR into |
|---|---|---|---|
| `feature/` | New functionality, e.g. `feature/GP-12-todo-due-dates` | `dev` | `dev` |
| `bugfix/` | Bugs found before release, e.g. `bugfix/GP-31-quiz-score` | `dev` | `dev` |
| `chore/` | Tooling, deps, config, docs, tests, e.g. `chore/GP-40-ci-pipeline` | `dev` | `dev` |
| `hotfix/` | Urgent production fixes, e.g. `hotfix/GP-50-login-crash` | `main` | `main`, then a back-merge PR `main` → `dev` |

Agents open PRs; **the PO merges every PR**, including the release PRs that promote `dev` → `staging` → `main`. Work branches are deleted after merging.

## The flow for one story

1. **PO** writes or approves a story on the board with acceptance criteria and marks it **Ready**.
2. **Orchestrator** creates a branch from `dev` named after the story, using the prefixes above.
3. **Tech lead** returns the plan: tasks, owners, verification, open questions.
4. **Specialists** build it in small commits. Commit messages start with the story key: `GP-12: add due date to todo schema`.
5. **QA engineer** makes sure every acceptance criterion has a passing test.
6. **Reviewer** checks the diff. Anything marked CHANGES NEEDED is fixed and reviewed again.
7. **Orchestrator** opens the PR into `dev` (title `GP-12: ...`) with the tech lead's description: what changed, how it was tested, what wasn't.
8. **PO** reviews and merges on GitHub, or asks for changes in PR comments. **Only the PO merges.**

Anything that needs a secret, an account, billing or production data stops at step 3 and becomes a **PO action** with exact instructions.

## Guardrails

- **`main`, `staging` and `dev` are protected by a hook**, `.claude/hooks/protect-branches.js` (configured in `.claude/settings.json`). It blocks agents from committing, merging or resetting on those branches, pushing to them, force-pushing, creating branches without an allowed prefix, and running `gh pr merge`. Both repos are public, so GitHub branch protection can be turned on as well (a PO setting); the hook stays as the guard on the agent side either way. Don't weaken it without the PO's say-so.
- **Secrets:** agents never read, print or edit `.env` files (also enforced in `.claude/settings.json`), and `.env` is git-ignored. `.env.example` documents the variables; the PO fills in the real `.env`.
- **Tests never touch the real database** or real external services.
- **One story = one branch = one PR**, kept small enough to review (about 400 changed lines at most; bigger stories get split).

## Unattended (overnight) runs

Planned. A scheduled cloud agent will pick up to N stories marked **Ready**, run the flow above for each, and open PRs. It never merges. The PO gets a morning summary: PRs opened, what's blocked, and decisions needed. Cloud runs have no access to secrets or the Atlas database. See the project plan for setup status.
