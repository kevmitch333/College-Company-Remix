# Hostinger Deployment Guide for College Company

The site is deployed to Hostinger as a Node.js application from the GitHub repository. Hostinger pulls the `main` branch, runs `npm install` and `npm run build`, and starts the app with `server.js`.

## How the app is served

`npm run build` compiles the React application into `dist/` using Vite. `server.js` is an Express 5 server that serves `dist/` as static files, exposes a `/health` endpoint for uptime checks, provides the `/api/market-intelligence` endpoint, and returns a real 404 page for unknown paths. `server.js` must stay free of top-level `await`, because Hostinger's loader uses `require()` and top-level `await` causes an `ERR_REQUIRE_ASYNC_MODULE` startup failure.

## Environment variables

Secrets such as `GEMINI_API_KEY` belong in the Hostinger Node.js environment variable settings, never in committed files or in client-side code. Changing these values requires a redeploy before they take effect.

## Deploying a change

Merge the change into `main` on GitHub. Hostinger rebuilds and restarts automatically. Confirm the result by checking `https://college.company/health` and loading the home page.

## Troubleshooting

If the site returns 503, open the Hostinger runtime logs for the deployment. A startup error usually names the file and line. If the build fails, check the build log for missing dependencies or TypeScript errors, and run `npm run build` locally to reproduce.

Local development uses `npm install` followed by `npm run dev`. Production behavior can be reproduced with `npm run build` and then `npm start`.
