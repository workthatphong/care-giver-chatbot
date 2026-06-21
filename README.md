# Care Giver Chatbot 

## Project Overview  
This project has been restructured into a Monorepo to prevent monolithic files and ensure scalable development. It is separated into `frontend` and `backend` workspaces, fully deployable on Vercel.

## Structure
- `/frontend`: React application built with Vite and Tailwind CSS.
- `/backend`: Node.js server setup.
- `package.json`: Root package with NPM workspaces configured.

## Running Locally
To start the frontend development server: 
```bash
npm run dev:frontend
```

## Deployment
This repository is configured for easy deployment on Vercel. Select `frontend` as the root directory when deploying the React application.