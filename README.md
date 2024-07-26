# FinTech Admin Vue3 Ag-Grid by <img src="/src/assets/reducemap.jpeg" alt="123" width="33" height="33">

> English | [Українська 🇺🇦](./README-ua.md)

Proof of Concept (POC) for the User Interface of a FinTech Admin Application using:

- [Vue 3](https://v3.vuejs.org/), [TypeScript](https://www.typescriptlang.org/)

- [AG Grid](https://www.ag-grid.com/), [AG Charts](https://charts.ag-grid.com/), [View UI Plus](https://iviewui.com/view-ui-plus/component/view/tree)

- [Vue Router](https://router.vuejs.org/), [Pinia](https://pinia.esm.dev/), [Vue i18n](https://vue-i18n.intlify.dev/),

- [Vite](https://vitejs.dev/), [TailwindCSS](https://tailwindcss.com/), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/#/), [commitlint](https://commitlint.js.org/)

## Demo

[Demo](https://fintech-admin-vue3-ag-grid.vercel.app/)

![123](/src/assets/reducemap.jpeg)

### Demo Notes

- **Heads up:** An enterprise license is required for AG Grid and AG Charts.
- **Note:** The following packages were used for the demo POC but can be removed:
  - vite-plugin-vue-devtools
  - spline
  - countries-list
  - xlsx (used for export to Excel, not recommended for production due to security issues)

## Features

Fintech template as POC output for [requirements documentation](./docs/srs)

## Project setup

```bash
$ git clone https://github.com/reduce-map/fintech-admin-vue3-ag-grid.git # clone the project
$ cd fintech-admin-vue3-ag-grid # enter the project directory
$ pnpm i # Install dependencies
$ pnpm dev # Start the development server
$ pnpm build # Build the project
$ pnpm preview # Preview the production build
$ pnpm type-check # type check
$ pnpm lint # lint code
```

After cloning the repository and running `pnpm install`, the `prepare` script is automatically run. This script sets up [Husky](https://typicode.github.io/husky/#/) git hooks which help ensure consistent code quality and commit message format.

## Git Hooks

This project uses [Husky](https://typicode.github.io/husky/#/) to manage git hooks. When you commit or push changes.

## Huge Thanks and Motivation

- [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template/) by [PanJiaChen](https://github.com/PanJiaChen)

- [Project Lines](https://app.spline.design/community/file/b45dff34-af2a-4bf8-bee4-6b8682ac7788) in [spline.design](https://spline.design/) by [Mahmut Elipek](https://app.spline.design/@mahmutelipek)

- [Chris Fritz's Vue Enterprise Boilerplate](https://github.com/bencodezen/vue-enterprise-boilerplate)

- [Brad Frost's Atomic Design](https://atomicdesign.bradfrost.com/)

## Mind Outcome

- “If a stone flying through the air were conscious, it would think it was flying by its own will,” relies on Spinoza, [original link](https://www.faculty.umb.edu/gary_zabel/Courses/Spinoza/Texts/Spinoza/let6258.htm)

- "It is evident from statistics that resource management is far more important than the resources themselves."
