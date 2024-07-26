# FinTech Admin Vue3 Ag-Grid

> [English 🇺🇸](./README.md) | Українська]

**Жива демо-версія:** https://fintech-admin-vue3-ag-grid.vercel.app/

Доказ концепції (POC) для інтерфейсу користувача фінтех-адмін-застосунку з використанням:

- [Vue 3](https://v3.vuejs.org/), [TypeScript](https://www.typescriptlang.org/)
- [AG Grid](https://www.ag-grid.com/), [AG Charts](https://charts.ag-grid.com/), [View UI Plus](https://iviewui.com/view-ui-plus/component/view/tree)
- [Vue Router](https://router.vuejs.org/), [Pinia](https://pinia.esm.dev/), [Vue i18n](https://vue-i18n.intlify.dev/)
- [Vite](https://vitejs.dev/), [TailwindCSS](https://tailwindcss.com/), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/#/), [commitlint](https://commitlint.js.org/)

## Демо

![Демо](https://github.com/reduce-map/fintech-admin-vue3-ag-grid/blob/feature/alignments-and-docs/docs/demo-%231-all-pages.gif)

![Демо](https://github.com/reduce-map/fintech-admin-vue3-ag-grid/blob/main/docs/demo-%231-all-pages.gif)

### Примітки щодо демо

- **Увага:** Для використання AG Grid та AG Charts потрібна корпоративна ліцензія.
- **Примітка:** Наступні пакети були використані для демо POC, але можуть бути видалені:
  - vite-plugin-vue-devtools
  - spline
  - countries-list
  - xlsx (використовується для експорту в Excel, не рекомендовано для використання у продакшені через проблеми з безпекою)

## Особливості

Фінтех шаблон як POC результат для [вимог документації](./docs/srs)

## Налаштування проекту

```bash
$ git clone https://github.com/reduce-map/fintech-admin-vue3-ag-grid.git # клонувати проект
$ cd fintech-admin-vue3-ag-grid # увійти в директорію проекту
$ pnpm i # встановити залежності
$ pnpm dev # запустити сервер розробки
$ pnpm build # зібрати проект
$ pnpm preview # переглянути збірку
$ pnpm type-check # перевірка типів
$ pnpm lint # перевірка коду
```

Після клонування репозиторію і запуску `pnpm install`, автоматично запускається скрипт `prepare`. Цей скрипт налаштовує git хуки Husky, які допомагають забезпечити постійну якість коду та форматування повідомлень про коміти.

## Git Хуки

Цей проект використовує Husky для управління git хуками. Коли ви комітуєте або пушите зміни, ці хуки допомагають забезпечити якість коду та правильний формат повідомлень про коміти.

## Велика Подяка та Мотивація

- [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template/) by [PanJiaChen](https://github.com/PanJiaChen)

- [Project Lines](https://app.spline.design/community/file/b45dff34-af2a-4bf8-bee4-6b8682ac7788) in [spline.design](https://spline.design/) by [Mahmut Elipek](https://app.spline.design/@mahmutelipek)

- [Chris Fritz's Vue Enterprise Boilerplate](https://github.com/bencodezen/vue-enterprise-boilerplate)

- [Brad Frost's Atomic Design](https://atomicdesign.bradfrost.com/)

- [Bon Jovi за гарний день](https://www.youtube.com/watch?v=uCg2BoKiuOM)

## Філософські Роздуми

- “Якби камінь, що летить у повітрі, був свідомий, він би думав, що летить за власною волею,” базується на Спінозі, [оригінальне посилання](https://www.faculty.umb.edu/gary_zabel/Courses/Spinoza/Texts/Spinoza/let6258.htm)
- “З очевидності статистики випливає, що управління ресурсами набагато важливіше, ніж самі ресурси.”
