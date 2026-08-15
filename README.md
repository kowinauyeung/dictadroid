# Dictadroid

A small React app for practising dictation. It uses Firebase Authentication,
Realtime Database, and Hosting. There is one production environment only.

## Requirements

- Node.js 20 or later
- Yarn 1.x
- Access to the `dictadroid` Firebase project

## Setup

Install dependencies:

```sh
yarn install
```

The production Firebase web configuration lives in `.env.production`. Firebase
web API keys identify the project and are safe to include in a client app;
database access is protected by `database.rules.json` and Firebase Auth.

## Commands

```sh
yarn start    # run locally with the production Firebase project
yarn build    # create a production build in dist/
yarn preview  # preview the production build
yarn deploy   # build and deploy Hosting and Realtime Database rules
```

Before deploying, authenticate the Firebase CLI once:

```sh
yarn firebase login --reauth
```

Google sign-in must remain enabled in Firebase Authentication. Any custom
Hosting domain also needs to be listed under Authentication > Settings >
Authorized domains.
