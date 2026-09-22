# Backend Project

An Express.js web application built with EJS templating and Tailwind CSS v4.

## Features

- **Express 5** server with dynamic EJS view rendering
- **Tailwind CSS v4** with live compilation via `@tailwindcss/cli`
- **Development Live-Reloading** via WebSocket
- **Responsive Layout** with modern header and navigation partials

## Getting Started

### Prerequisites

- Node.js (v20+)
- pnpm (or npm)

### Installation

```bash
# Clone the repository
git clone https://github.com/Jhosep14/backend-project.git
cd backend-project

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
```

### Running Locally

```bash
# Start server and Tailwind CSS watcher concurrently
pnpm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build and minify CSS
pnpm run build:css

# Start production server
pnpm start
```
