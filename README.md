# Backend Project

CSE 340 catalog built with Express 5, EJS, Tailwind CSS 4, and PostgreSQL.

## Local setup

Requires Node.js 24, PostgreSQL, and pnpm. Install dependencies and configure
`.env` with a PostgreSQL URL for the `cse340` database:

```env
NODE_ENV=development
PORT=3000
DB_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/cse340
ENABLE_SQL_LOGGING=false
```

Keep `.env` private. Then run:

```bash
pnpm install
pnpm run db:check
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001). The app creates the Unit 3
tables and inserts missing seed data at startup without dropping existing rows.

## Production

```bash
pnpm run build:css
pnpm start
```

## Render

Connect the GitHub repository as a Node web service on branch `main`:

- Build: `npm ci --include=dev && npm run build`
- Start: `npm start`
- Health check: `/`
- Auto-deploy: enabled

Set `DB_URL` to a PostgreSQL connection reachable from Render. A Render service
cannot connect to a database through your computer's `localhost`. Render sets
`PORT` and `NODE_ENV` automatically.
