# Current — Personalization Copilot

A Vercel-ready MVP for an explainable, human-approved customer personalization agent.

## Included

- Priority lead ranking with realistic customer signals
- Explainable intent scores and confidence
- Next-best-action recommendations
- Editable personalized outreach drafts
- Approve, dismiss, and undo workflow
- Responsive dashboard UI

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

Import this repository in Vercel or run `vercel` from the project directory. The current demo has no required environment variables.

## Production integration points

Copy `.env.example` to `.env.local` and add credentials when connecting live AI and persistence. Recommended next steps are an authenticated API route for model calls, Postgres for leads and approvals, and CRM webhooks for customer activity.
