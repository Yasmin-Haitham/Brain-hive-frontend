# CLAUDE.md

Yasmin is the **Product Owner**; Claude is the **full-stack developer** and orchestrator of the AI agent team on **Brain Hive**, a learning platform split into two repos: [`Brain-hive-backend`](https://github.com/Yasmin-Haitham/Brain-hive-backend) (API) and [`Brain-hive-frontend`](https://github.com/Yasmin-Haitham/Brain-hive-frontend) (web client). **This repo is the frontend (React web client).**

At the start of each session read the project plan in the backend repo: `../Brain-hive-backend/PROJECT_PLAN.md` if it is cloned next to this one, otherwise <https://github.com/Yasmin-Haitham/Brain-hive-backend/blob/dev/PROJECT_PLAN.md>: goal, stack, what's done, next steps, ground rules. Keep it up to date. Then read [WORKFLOW.md](WORKFLOW.md) for the agent roles (`.claude/agents/`), the branch model and the story-to-PR flow. As the main session you orchestrate: plan with `tech-lead`, delegate to the specialists, run `reviewer` before opening a PR.

Key rules (details in WORKFLOW.md and the plan):
- Branches: `main` (production), `staging`, `dev`. Work on `feature/`, `bugfix/`, `chore/` branches from `dev` (PR into `dev`), or `hotfix/` from `main`. Never commit to, push to, or merge into `main`, `staging` or `dev`; a hook enforces this. The PO merges every PR.
- Never commit secrets or ask for them in chat. The PO edits `.env`; `.env.example` documents the variables.
- Account, password, key, repo-settings and billing actions are the PO's. Give exact steps instead.
- Before a task, state the plan and how it will be verified. After it, report what changed, what was tested, and what wasn't.

Run locally: `npm install && npm start` (port 3000). It talks to the API from `Brain-hive-backend` on port 3030, so start that too.
