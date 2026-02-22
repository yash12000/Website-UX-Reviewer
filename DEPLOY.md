# Deployment Guide

This document shows how to deploy the backend to Render and the frontend to Vercel, and the minimal environment variables required.

---

## Backend — Render (Web Service)

1. Go to https://render.com and log in.
2. Click **New → Web Service**.
3. Connect your GitHub repository and select this project.
4. When prompted, choose the **backend** folder as the Root Directory.

Settings:

- Build Command: `npm install`
- Start Command: `node server.js`

Environment variables (Render → Service → Environment):

- `OPENAI_API_KEY` = your_openai_key (no quotes, no spaces, starts with `sk-`)
- `MONGO_URI` = your_mongo_connection_string

Important notes:

- If you do not set `OPENAI_API_KEY`, the app will still start but LLM features will return a safe fallback.
- If Mongo fails to connect, the server will log the error but will not exit (see `backend/db.js`).

Manual deploy:

1. Save environment variables.
2. Click **Manual Deploy → Deploy Latest Commit**.

Test the deployed service:

Open `https://your-backend.onrender.com/status` — expected response when envs are set:

```
{
  "backend": "OK",
  "database": "OK",
  "llm": "OK"
}
```

If `llm` shows `Missing`, set `OPENAI_API_KEY` in Render and redeploy.

---

## Frontend — Vercel

1. Go to https://vercel.com and log in.
2. Click **Add New Project** → Import GitHub repo.
3. Choose the **frontend** folder as the Root Directory for the project.

Settings:

- Framework: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

Before deploying, update `frontend/src/api.js` to point to your deployed backend API:

```js
export const API = axios.create({
  baseURL: "https://your-backend.onrender.com/api"
});
```

After deployment, your site will be available at `https://your-app.vercel.app` (URL provided by Vercel).

---

## Quick Troubleshooting

- If the backend crashes on startup, check Render Logs → they show the exact error.
- Common fixes:
  - Add the environment variables described above.
  - Ensure the Start Command is `node server.js` and Root Directory is `backend`.
  - If Mongo fails, confirm `MONGO_URI` and Atlas network access.

---

## Helpful Code Snippets

`backend/db.js` — non-fatal DB connect (already applied):

```js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Mongo Error:", err.message || err);
    // Do not crash the app on DB errors; allow the app to start and recover.
  }
};

export default connectDB;
```

`backend/services/llm.js` — safe fallback when `OPENAI_API_KEY` is missing (already applied):

```js
if (!process.env.OPENAI_API_KEY) {
  export const generateUXReview = async () => ({ score: 70, issues: [], improvements: [] });
}
```

---

If you'd like, I can also add GitHub Actions or Render/Vercel configuration files to automate deployments. Ask me to add CI next.
