# Backend Project

CSE 340 catalog built with Express 5, EJS, Tailwind CSS 4, and PostgreSQL.

## Local development

Requires Node.js 24 and pnpm. Set `.env` with the CSE IO PostgreSQL connection
string, including its SSL option, and a `SESSION_SECRET`. Keep `.env` private.

```bash
pnpm install
pnpm run db:check
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001). The app creates the Unit 3
schema and seeds missing department, course, faculty, and section data at startup.

## Render deployment

Connect this repository to a Node web service on branch `main`. The included
`render.yaml` defines the service, build, start, health check, and auto-deploy
settings.

Set `DB_URL` to the same CSE IO connection string in your local `.env`, and set
`SESSION_SECRET` to the same local value. Do not add `PORT`, `NODE_ENV`, or
`ENABLE_SQL_LOGGING`; Render manages those settings.

[Unit 3 PostgreSQL](https://byui-cse.github.io/cse340-course/unit/3/prove/intro-to-postgres.html) · [Unit 4 deployment](https://byui-cse.github.io/cse340-course/unit/4/prove/deployment.html)
