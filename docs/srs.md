# SRS for the POC User Interface

> Software Requirements Specification for the User Interface Proof of Concept

## Problematic

1. **Rapid Application Development (RAD):** The challenge of quickly developing user interfaces (UI) for financial services applications.

2. **Interface Needs:**

- Efficient bot automation
- Algorithmic trading interfaces
- Real-time data handling

3. **Goal:** Create a fintech interface that supports advanced functionalities such as comprehensive data grids, interactive financial charts, and user-friendly design systems inspired by platforms like **TradingView, Binance, Coinbase, and CoinMarketCap**.

## Business Requirement

To accelerate development processes and improve efficiency, full-stack developers need access to high-level components that can significantly speed up the development cycle. This involves creating high-level user interface components that can handle complex financial data and operations.

## Functional Requirements. Core Components

1. Grid Component

- **Editability:** Users can directly edit data within the grid cells.
- **Drag and Drop:** Users can reorganize columns and rows by dragging and dropping.
- **Resizable Columns:** Users can adjust the width of columns for better viewing.
- **Sorting, Filtering, Grouping:** Tools for organizing and analyzing data.
- **Row Selection:** Support for selecting one or multiple rows for further actions.
- **Cell Formatting:** Options to customize the appearance of cell data.
- **Cell Validation:** Ensuring the correctness of entered data.
- **Cell Merging:** Ability to merge multiple cells into one.
- **Cell Freezing:** Freezing specific columns or rows for constant display.
- **Cell Tooltips:** Displaying additional information on hover.
- **Cell Context Menu:** Menu with functions like copy, paste, and other operations.
- **Cell Copy/Paste:** Capability to copy and paste data between cells.
- **Undo/Redo:** Support for undoing and redoing actions up to 5 steps.
- **Cell Formulas:** Support for formulas to perform calculations within cells.
- **Cell Hyperlink:** Ability to add hyperlinks in cells.
- **Cell Image:** Inserting images into cells.
- **Cell Comment:** Adding comments to cells.
- **Cell Data Binding:** Support for binding cells to data sources.

  **Example:** Detailed guidance on creating and configuring grid components can be found in the Sencha Ext JS Grid Component documentation [here](https://cdn.sencha.com/ext/commercial/4.2.4/docs/index.html#!/guide/grid). While this example demonstrates functional capabilities suitable for the project, a different solution is required to better align with the specific needs and technological trends.

2. Financial Chart Component

- **Financial Charts:** Includes candlestick charts and other types of financial charts.
- **Interactive Drawing Tools:** Ability to draw on charts, such as trend lines and Fibonacci retracements.

3. Design System

- **Consistent and Unified Style:** Ensuring a cohesive and unified style for all components.
- **Inspired by TradingView, Binance, Coinbase, and CoinMarketCap:** Utilizing best practices and ideas from these platforms.

4. User Management

- **Admin Interface:** Tools for managing users and system settings.

## Non-Functional Requirements

1. **Performance**

- **Page Load Speed:** The time to load the main interface pages should not exceed 3 seconds under normal server load.
- **Data Handling:** The system should be able to process and display large volumes of data (up to 50,000 rows in a table) without noticeable delays.

2. **Scalability**

- **Grids:** The grid component should support efficient management of large numbers of rows and columns.
- **Design System:** Interface components should be easily scalable and reusable across different parts of the application.

3. **Reliability**

- **Monitoring and Logging:** Use tools like Datadog or Sentry for real-time monitoring and logging of errors.
- **Data Backup:** Regular data backups to prevent information loss.

4. **Security**

- **Authentication and Authorization:** Support for multi-factor authentication (MFA) and role-based access control to ensure security.
- **Data Encryption:** All data should be transmitted and stored in encrypted form (e.g., using HTTPS and AES).
- **Standards Compliance:** The system should comply with security standards such as PCI DSS for handling payment information.

5. **Usability**

- **Interface:** Intuitive and user-friendly interface.
- **Documentation:** Detailed documentation for users and administrators.
- **Localization:** Support for multiple interface languages (e.g., English, Ukrainian).

6. **Caching**

- **Feedback:** Ability to leave feedback and receive support through an integrated chat or ticket system.
- **Updates:** Regular system updates based on user feedback and new functional requirements.

7. **Integration**

- **Monitoring and Logging:** Use tools like Datadog or Sentry for real-time monitoring and logging of errors.
- **Data Backup:** Regular data backups to prevent information loss.

## Use Cases

1. **Dashboard Page**

- **Scenario:** The user navigates to the Dashboard page and sees an overview of indices and trading volumes.
- **User Action:** The user can switch between different chart types (candlestick, OHLC, etc.) and use tools for annotations and drawing.
- **Expected Outcome:** The user gets a clear and interactive view of current market data.

2. **Bot Page**

- **Scenario:** The user accesses the bot management page to configure trading bot parameters.
- **User Action:** The user can set and modify bot parameters such as operating mode, risk percentage per trade, maximum losses, etc.
- **Expected Outcome:** The user can efficiently manage bot parameters, adjust settings, and monitor operation logs.

3. **Settings Page**

- **Scenario:** The user navigates to the settings page to change application configurations.
- **User Action:** The user can change the interface language, theme, and set user preferences.
- **Expected Outcome:** The user customizes the application according to their preferences.

4. **Reports Page**

- **Scenario:** The user opens the reports page to analyze and manage financial data.
- **User Action:** The user can filter, sort, and group data, as well as export reports in various formats.
- **Expected Outcome:** The user receives detailed information on trades and can export data for further analysis.

5. **CoinGecko Sample Page**

- **Scenario:** The user views information on various cryptocurrencies.
- **User Action:** The user can see the current price, market capitalization, and other metrics of cryptocurrencies.
- **Expected Outcome:** The user receives up-to-date information on the cryptocurrency market.

## Business Context Acceptance Criteria

1. **Rapid Development and High-Level Components:**

- Given the project setup, when a new feature is requested, then the development team should be able to prototype and implement the feature within two sprints.
- Given a high-level component is integrated, when data types change, then the component should be easily adaptable without significant code refactoring.
- Given the need for integration, when connecting to external systems (e.g., APIs, databases), then the system should support quick and reliable integration processes.

2. **Financial Chart Visualization:**

- Given the financial chart component, when data is loaded, then the chart should correctly display various types of financial data (e.g., candlestick, OHLC).
- Given interactive tools, when a user annotates the chart, then the annotations should be visible and editable.
- Given real-time data updates, when new data is received, then the chart should update without requiring a page reload.
- Given technical indicators (e.g., TPOC, VPOC), when a user applies an indicator to a chart, then the system should accurately display and update the indicator.
- Given different time frames (e.g., m1, m5, m15, m30, h1, h4, h12, h24, d1, d7, d30, d365), when a user selects a time frame, then the system should update the chart and analysis accordingly.

3. **Trading Bot Management:**

- Given the bot management interface, when a user sets parameters for a trading bot, then the system should save and apply these settings.
- Given the bot status monitoring, when a bot is active, then the user should see real-time updates on the bot’s performance.
- Given performance analysis tools, when the user reviews bot activities, then the system should provide detailed logs and metrics.

4. **Data Transactions and User-Managed Data:**

- Given the data upload feature, when a user uploads data, then the system should validate and store the data correctly.
- Given the data download feature, when a user requests to download data, then the system should provide the data in the requested format (e.g., CSV, Excel).
- Given data transaction capabilities, when a user performs a transaction, then the system should accurately record and reflect this in the user interface.

5. **Integration with Common Data Sources:**

- Given integration with Google Sheets, when a user imports data from Google Sheets, then the system should correctly parse and display the data.
- Given the export functionality, when a user exports data to Google Sheets, then the data should maintain its structure and formatting.
- Given the ability to work with various data sources, when a user integrates other tabular data, then the system should support seamless integration and display.

6. **Back-Testing:**

- Given the back-testing feature, when a user selects a strategy to back-test, then the system should simulate past performance using historical data.
- Given the result analysis, when the back-test is complete, then the system should display detailed results, including profit/loss metrics and visual charts.
- Given user-configurable parameters, when a user adjusts back-testing parameters, then the system should re-run the test and update the results accordingly.

7. **Real-Time News and Market Impact Analysis:**

- Given real-time news integration, when new financial news is published, then the system should display the news and analyze its potential impact on market prices.
- Given real-time market data, when a user monitors asset prices, then the system should provide real-time updates and analysis of price movements.

## Technical Context Acceptance Criteria

1. **Functional Requirements:**

- Refer to the functional requirements section for detailed criteria on features like data grid management, financial charts, user management, and data transactions.

2. **Non-functional Requirements:**

- **Performance:** The main pages of the interface must load within 3 seconds under normal server load conditions.
- **Scalability:** The data grid must efficiently handle and display up to 50,000 rows without significant delays.
- **Reliability:** The system should implement monitoring and logging mechanisms using tools like Datadog or Sentry.
- **Security:** All data transmission and storage must use encryption (HTTPS, AES).
- **Usability:** The user interface must be intuitive, with thorough documentation available for users and administrators. The interface should support multiple languages (e.g., English, Ukrainian).
- **Caching:** Implement data caching mechanisms to reduce server load and improve application speed.

3. **Data Handling:**

- Given the need for mock data during the MVP phase, the system should seamlessly switch between mock data and real data sources once the backend is fully integrated.
- Given different types of financial data (e.g., digital assets, real-time data), the system should support aggregation and analysis of these data types.

4. **Technical Indicators and Analysis:**

- Given technical indicators (e.g., TPOC, VPOC), when a user applies an indicator to a chart, then the system should accurately display and update the indicator.
- Given different time frames (e.g., m1, m5, m15, m30, h1, h4, h12, h24, d1, d7, d30, d365), when a user selects a time frame, then the system should update the chart and analysis accordingly.
