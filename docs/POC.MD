# SRS for the UI POC

> Software Requirements Specification for the User Interface Proof of Concept

## Problematic

1. The rapid application development (RAD) of user interfaces (UI) for financial services applications.

2. The needs are interface for:

   - efficient bot automation
   - algorithmic trading interfaces
   - real-time data handling

3. The goal is to create a fintech interface that supports advanced functionalities such as comprehensive data grids,
   interactive financial charts and user-friendly design systems inspired by platforms like **TradingView, Binance, Coinbase, and CoinMarketCap.**

## Business Requirement

To accelerate development processes and improve efficiency, full-stack developers need access to high-level components that can significantly speed up the development cycle.
This involves high-level User Interface components that can handle complex financial data and operations.

## Основные Функциональные требования

1. Grid (Компонент сетки данных)
   - Редактируемость ячеек (Editability): Пользователи могут изменять данные непосредственно в ячейках сетки.
   - Перетаскивание колонок и строк (Drag and Drop): Возможность перетаскивания колонок и строк для удобной реорганизации данных.
   - Изменение размера колонок (Resizable Columns): Пользователи могут изменять ширину колонок для удобства просмотра.
   - Сортировка, фильтрация и группировка данных (Sorting, Filtering, Grouping): Инструменты для упорядочивания и анализа данных.
   - Выбор строк (Row Selection): Поддержка выбора одной или нескольких строк для дальнейших действий.
   - Форматирование ячеек (Cell Formatting): Возможность настройки отображения данных в ячейках.
   - Валидация данных в ячейках (Cell Validation): Проверка корректности введенных данных.
   - Объединение ячеек (Cell Merging): Объединение нескольких ячеек в одну.
   - Замораживание ячеек (Cell Freezing): Закрепление колонок или строк для постоянного отображения.
   - Всплывающие подсказки (Cell Tooltips): Отображение дополнительной информации при наведении на ячейку.
   - Контекстное меню (Cell Context Menu): Меню с функциями копирования, вставки и других операций.
   - Копирование и вставка данных (Cell Copy/Paste): Возможность копирования и вставки данных между ячейками.
   - Отмена и повтор действий (Undo/Redo): Поддержка отмены и повтора действий до 5 шагов.
   - Формулы в ячейках (Cell Formulas): Поддержка формул для вычислений в ячейках.
   - Гиперссылки в ячейках (Cell Hyperlink): Возможность добавления гиперссылок.
   - Изображения в ячейках (Cell Image): Возможность вставки изображений.
   - Комментарии в ячейках (Cell Comment): Возможность добавления комментариев.
   - Привязка данных (Cell Data Binding): Поддержка привязки ячеек к данным.

Пример: Подробное руководство по созданию и настройке компонентов сетки данных можно найти в документации Sencha Ext JS Grid Component здесь. Хотя этот пример показывает функциональные возможности, подходящие для проекта, требуется другое решение, которое лучше соответствует текущим потребностям и технологическим предпочтениям.

2. Financial Chart Component (Компонент финансовых графиков)

- Поддержка финансовых графиков (Financial Charts): Включает свечные графики и другие виды финансовых графиков.

- Интерактивные инструменты для рисования (Interactive Drawing Tools): Возможность рисования на графиках, таких как трендовые линии и уровни Фибоначчи.

3. Design System (Дизайн-система)

- Единый стиль (Consistent and Unified Style): Обеспечение согласованного и унифицированного стиля всех компонентов.

- Смотри в TradingView, Binance, Coinbase и CoinMarketCap: Использование лучших практик и идей от этих платформ.

4. User Management (Управление пользователями)

- Администраторский интерфейс (Admin Interface): Инструменты для управления пользователями и системными настройками.

## Non-Functional Requirements

### Производительность (Performance)

    -	Скорость загрузки страниц: Время загрузки основных страниц интерфейса не должно превышать 3 секунд при нормальной загрузке сервера.
    -	Обработка данных: Система должна быть способна обрабатывать и отображать большие объемы данных (до 50,000 строк в таблице) без заметных задержек.

### Масштабируемость (Scalability)

    -	Гриды: Компонент сетки данных должен поддерживать эффективное управление большим количеством строк и колонок.
    -	Дизайн-система: Компоненты интерфейса должны быть легко масштабируемыми и повторно используемыми в различных частях приложения.

### Надежность (Reliability)

    -	Мониторинг и логирование: Использование инструментов, таких как Datadog или Sentry, для мониторинга и логирования ошибок в реальном времени.
    -	Резервное копирование данных: Регулярное резервное копирование данных для предотвращения потерь информации.

### Безопасность (Security)

    -	Аутентификация и авторизация: Поддержка многофакторной аутентификации (MFA) и ролевой модели доступа для обеспечения безопасности.
    -	Шифрование данных: Все данные должны передаваться и храниться в зашифрованном виде (например, использование HTTPS и AES).
    -	Соответствие стандартам: Система должна соответствовать стандартам безопасности, таким как PCI DSS для обработки платежной информации.

### Удобство использования (Usability)

    -	Интерфейс: Интуитивно понятный и удобный пользовательский интерфейс.
    -	Документация: Подробная документация для пользователей и администраторов.
    -	Локализация: Поддержка нескольких языков интерфейса (например, английский, русский).

### Поддержка (Support)

    -	Обратная связь: Возможность оставлять обратную связь и получать поддержку через встроенный чат или систему тикетов.
    -	Обновления: Регулярные обновления системы с учетом пользовательских отзывов и новых функциональных требований.

### Надежность (Reliability)

    -	Мониторинг и логирование: Использование инструментов, таких как Datadog или Sentry, для мониторинга и логирования ошибок в реальном времени.
    -	Резервное копирование данных: Регулярное резервное копирование данных для предотвращения потерь информации.

## Use Cases

1. Dashboard Page

- Сценарий: Пользователь переходит на страницу Dashboard и видит сводную информацию о состоянии индексов и объемах торгов.
  - Действие пользователя: Пользователь может переключаться между различными видами графиков (свечной, OHLC и др.), а также использовать инструменты для аннотаций и рисования.
  - Ожидаемый результат: Пользователь получает наглядную и интерактивную информацию о текущих рыночных данных.

2. Bot Page

- Сценарий: Пользователь заходит на страницу управления ботами для настройки параметров торговых ботов.
- Действие пользователя: Пользователь может задавать и изменять параметры бота, такие как режим работы, процент риска на сделку, максимальные убытки и т.д.
- Ожидаемый результат: Пользователь может эффективно управлять параметрами бота, изменять настройки и следить за логами операций.

3. Settings Page

- Сценарий: Пользователь переходит на страницу настроек для изменения конфигурации приложения.
  - Действие пользователя: Пользователь может изменить язык интерфейса, тему оформления, а также задать пользовательские параметры.
- Ожидаемый результат: Пользователь настраивает приложение в соответствии со своими предпочтениями.

4. Reports Page

- Сценарий: Пользователь открывает страницу отчетов для анализа и управления финансовыми данными.
- Действие пользователя: Пользователь может фильтровать, сортировать и группировать данные, а также экспортировать отчеты в различные форматы.
- Ожидаемый результат: Пользователь получает детализированную информацию по сделкам и может экспортировать данные для дальнейшего анализа.

5. CoinGecko Sample Page
   - Сценарий: Пользователь просматривает информацию о различных криптовалютах.
   - Действие пользователя: Пользователь может видеть текущую стоимость, рыночную капитализацию и другие метрики криптовалют.
   - Ожидаемый результат: Пользователь получает актуальную информацию о состоянии криптовалютного рынка.

Business Context Acceptance Criteria:

    1.	Rapid Development and High-Level Components:
    -	Given the project setup, when a new feature is requested, then the development team should be able to prototype and implement the feature within two sprints.
    -	Given a high-level component is integrated, when data types change, then the component should be easily adaptable without significant code refactoring.
    -	Given the need for integration, when connecting to external systems (e.g., APIs, databases), then the system should support quick and reliable integration processes.
    2.	Financial Chart Visualization:
    -	Given the financial chart component, when data is loaded, then the chart should correctly display various types of financial data (e.g., candlestick, OHLC).
    -	Given interactive tools, when a user annotates the chart, then the annotations should be visible and editable.
    -	Given real-time data updates, when new data is received, then the chart should update without requiring a page reload.
    -	Given technical indicators (e.g., TPOC, VPOC), when a user applies an indicator to a chart, then the system should accurately display and update the indicator.
    -	Given different time frames (e.g., m1, m5, m15, m30, h1, h4, h12, h24, d1, d7, d30, d365), when a user selects a time frame, then the system should update the chart and analysis accordingly.
    3.	Trading Bot Management:
    -	Given the bot management interface, when a user sets parameters for a trading bot, then the system should save and apply these settings.
    -	Given the bot status monitoring, when a bot is active, then the user should see real-time updates on the bot’s performance.
    -	Given performance analysis tools, when the user reviews bot activities, then the system should provide detailed logs and metrics.
    4.	Data Transactions and User-Managed Data:
    -	Given the data upload feature, when a user uploads data, then the system should validate and store the data correctly.
    -	Given the data download feature, when a user requests to download data, then the system should provide the data in the requested format (e.g., CSV, Excel).
    -	Given data transaction capabilities, when a user performs a transaction, then the system should accurately record and reflect this in the user interface.
    5.	Integration with Common Data Sources:
    -	Given integration with Google Sheets, when a user imports data from Google Sheets, then the system should correctly parse and display the data.
    -	Given the export functionality, when a user exports data to Google Sheets, then the data should maintain its structure and formatting.
    -	Given the ability to work with various data sources, when a user integrates other tabular data, then the system should support seamless integration and display.
    6.	Back-Testing:
    -	Given the back-testing feature, when a user selects a strategy to back-test, then the system should simulate past performance using historical data.
    -	Given the result analysis, when the back-test is complete, then the system should display detailed results, including profit/loss metrics and visual charts.
    -	Given user-configurable parameters, when a user adjusts back-testing parameters, then the system should re-run the test and update the results accordingly.
    7.	Real-Time News and Market Impact Analysis:
    -	Given real-time news integration, when new financial news is published, then the system should display the news and analyze its potential impact on market prices.
    -	Given real-time market data, when a user monitors asset prices, then the system should provide real-time updates and analysis of price movements.

Technical Context Acceptance Criteria

Technical Context Acceptance Criteria:

    1.	Functional Requirements:
    -	Refer to the functional requirements section for detailed criteria on features like data grid management, financial charts, user management, and data transactions.
    2.	Non-functional Requirements:
    -	Performance: The main pages of the interface must load within 3 seconds under normal server load conditions.
    -	Scalability: The data grid must efficiently handle and display up to 50,000 rows without significant delays.
    -	Reliability: The system should implement monitoring and logging mechanisms using tools like Datadog or Sentry.
    -	Security: All data transmission and storage must use encryption (HTTPS, AES).
    -	Usability: The user interface must be intuitive, with thorough documentation available for users and administrators. The interface should support multiple languages (e.g., English, Ukrainian).
    -	Caching: Implement data caching mechanisms to reduce server load and improve application speed.
    3.	Data Handling:
    -	Given the need for mock data during the MVP phase, the system should seamlessly switch between mock data and real data sources once the backend is fully integrated.
    -	Given different types of financial data (e.g., digital assets, real-time data), the system should support aggregation and analysis of these data types.
    4.	Technical Indicators and Analysis:
    -	Given technical indicators (e.g., TPOC, VPOC), when a user applies an indicator to a chart, then the system should accurately display and update the indicator.
    -	Given different time frames (e.g., m1, m5, m15, m30, h1, h4, h12, h24, d1, d7, d30, d365), when a user selects a time frame, then the system should update the chart and analysis accordingly.

By meeting these acceptance criteria, the user interface will be validated for its intended functionality, performance, and user experience, ensuring it meets the needs and expectations of the users and stakeholders.
