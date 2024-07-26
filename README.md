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

### Demo Notes

- please mention for enterprise licence for ag grid and ag charts

- For POC demo and presentation also were used
  - vite-plugin-vue-devtools
  - spline
  - countries-list
  - xlsx - used for export to excel not recommended for production because of security issues

## Features

Fintech template as poc output for [the requirement and documentation](./docs/poc.md)

##

```bash
$ git clone https://github.com/reduce-map/fintech-admin-vue3-ag-grid.git # clone the project
$ cd fintech-admin-vue3-ag-grid # enter the project directory
$ pnpm i # Install dependencies
$ pnpm dev # Start the development server

# preview the production build
pnpm preview
# type check
pnpm type-check

# lint code
pnpm lint
```

After cloning the repository and running `pnpm install`, the `prepare` script is automatically run. This script sets up [Husky](https://typicode.github.io/husky/#/) git hooks which help ensure consistent code quality and commit message format. See the [Git Hooks](#git-hooks) section for more details.

## Development mode

```bash
$ npm run dev # concurrently run all services in development mode
$ npm run dev:user-gateway # run user-gateway service in development mode
$ npm run dev:auth-service # run auth-service service in development mode
$ npm run dev:session-updater # run session-updater service in development mode
$ npm run dev:overlord-omnisafe # run overlord-omnisafe service in development mode
```

```bash
$ npm run build # build all services

```

## Environment Variables

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

Details and nuances of the development process can be found in the [dev-notes.md](./docs/dev-notes.md) file.
