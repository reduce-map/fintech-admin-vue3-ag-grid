# FinTech Admin Vue3 Ag-Grid

English | [Українська 🇺🇦](./README-ua.md)

Proof of Concept (POC) of User Interface for FinTech Admin Application with:

[Vue 3](https://v3.vuejs.org/), [TypeScript](https://www.typescriptlang.org/)

[AG Grid](https://www.ag-grid.com/), [AG Charts](https://charts.ag-grid.com/), [View UI Plus](https://iviewui.com/view-ui-plus/component/view/tree)

[Vue Router](https://router.vuejs.org/), [Pinia](https://pinia.esm.dev/), [Vue i18n](https://vue-i18n.intlify.dev/),

[Vite](https://vitejs.dev/), [TailwindCSS](https://tailwindcss.com/), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/#/), [commitlint](https://commitlint.js.org/)



## Demo

[Demo](https://fintech-admin-vue3-ag-grid.vercel.app/)

![123](/src/assets/reducemap.jpeg)

For Demo and POC presentation also were used: vite-plugin-vue-devtools, spline, countries-list, xlsx

xlsx is used for export to excel not recommended for production because of security issues

They can be easily replaced with other libraries or components.

Please mention for enterprise licence for ag grid and ag charts






## Features

Fintech template as poc output for [the requirement and documentation](./docs/poc.md)

For POC presentation also were used: vite-plugin-vue-devtools, spline, countries-list, xlsx

Please mention for enterprise licence for ag grid and ag charts

## Build Setup

```bash
# Clone the project
git clone https://github.com/reduce-map/fintech-admin-vue3-ag-grid.git

# Enter the project directory
cd fintech-admin-vue3-ag-grid

# Install dependencies
pnpm i

# Start the server
pnpm dev
```

## Build

```bash
# Build
pnpm build
```

Advanced:

```bash
# preview the production build
pnpm preview

# type check
pnpm type-check

# lint code
pnpm lint
```

## Huge thanks to:
- (Chris Fritz's Vue Enterprise Boilerplate)[https://github.com/bencodezen/vue-enterprise-boilerplate]
- (Brad Frost's Atomic Design)[https://atomicdesign.bradfrost.com/]
- (vue-admin-template)[https://github.com/PanJiaChen/vue-admin-template/]

## Installation

After cloning the repository and running `npm install`, the `prepare` script is automatically run. This script sets up [Husky](https://typicode.github.io/husky/#/) git hooks which help ensure consistent code quality and commit message format. See the [Git Hooks](#git-hooks) section for more details.

```bash
$ npm install
```

### npm Configuration

An .npmrc file is needed for Docker and for private @silent-team npm packages installation. The file should be located in the root of the project.

**Note:** Without .npmrc you will get an error. The repo contains private @silent-team packages.

## Development mode

```bash
$ npm run dev # concurrently run all services in development mode
$ npm run dev:user-gateway # run user-gateway service in development mode
$ npm run dev:auth-service # run auth-service service in development mode
$ npm run dev:session-updater # run session-updater service in development mode
$ npm run dev:overlord-omnisafe # run overlord-omnisafe service in development mode
```

## Building the app

Before starting the application, it's recommended to build it first. This will transpile the TypeScript code into JavaScript, which can then be run directly by Node.js. This step is especially important if you're running the application in a production environment.

```bash
$ npm run build # build all services
$ npm run build:user-gateway # build user-gateway service
$ npm run build:auth-service # build auth-service service
$ npm run build:data-provider # build data-provider service
$ npm run build:session-updater # build session-updater service
$ npm run build:overlord-omnisafe # build overlord-omnisafe service
```

## Service-Specific Environment Variables

Each service within our monorepo now has its dedicated .env.docker file. Please refer to these files for environment variable settings.

## Linting and Formatting

To ensure code quality and consistency, you can run ESLint and Prettier using the following commands:

```bash
$ npm run lint # run ESLint
$ npm run format # run Prettier
```

## Git Hooks

This project uses [Husky](https://typicode.github.io/husky/#/) to manage git hooks. When you commit or push changes, the following actions are triggered:

### pre-commit

Before each commit, the `precommit` script is run. This script triggers [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to ensure code quality and consistency. If any issues are found that can't be automatically fixed, the commit will be aborted.

### pre-push

Before each push, the test suite is run to ensure that all tests pass. If any tests fail, the push will be aborted.

## Dev Notes

As you're scr
