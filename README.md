# Hello! Welcome to the landing page demo

The project is composed by 2 apps:
- frontend-app
- strapi-app

## Frontend-app

As the name says contains all the code related to the frontend, is a nextjs application with React + Typescript.

NextJs allowed me to have an in-built routing system based on the folder structure app/pages/[id]/page.tsx 

I built an adapter to the strapi-app to retrieve the landing pages and to upload the lead information.

For testing, I used Vite, I created some tests for the adapter layer.

For parsing the answer from strapi and taking care of the correct format I used zod.

As the instructions included I used styled components for the frontend, I created some of them in the components folder:
- title
- description
- hero-image
- form-section

### How to run frontend-app
env variables:
```properties
TOKEN_API_STRAPI=<TOKEN-STRAPI>
STRAPI_BASE_URL=http://localhost:1337
```

```bash
cd frontend-app
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Strapi-app

As the name says is a strapi application.

It contains all the strapi backend

It has 2 content type:
- Lead: contains inside an email field
- Page: contains inside a title, description and the image that has a page

### How to run strapi-app
env variables:
```properties
# Server
HOST=0.0.0.0
PORT=1337

# Secrets
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=

# Database
DATABASE_CLIENT=sqlite
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_SSL=false
DATABASE_FILENAME=.tmp/data.db
JWT_SECRET=

```
```bash
cd strapi-app

npm run develop
# or
yarn develop
```