## Take Home Test

# Financial Dashboard Widget with US Stock

## Project Description
Project Objective: Create graphs displaying real-time stock prices.
Implemented 3 graphs for Microsoft, IBM, and Nvidia stocks, with current price and percentage change displayed separately under each graph.

Project code is written in JavaScript using React library.

## Start the project
You can view the project on GitHub by visiting [this gh page](https://maksymchukhrai.github.io/Dashboard-Widget/).

## Data for Graphs
Data is obtained in two ways:
- For Microsoft and Nvidia stock graphs, data is fetched from the local file 'src\data\stock_mkt_time_data.json' as per task requirements.
- For IBM stock graph, a free [public API "Daily Time Series with Splits and Dividend Events"](https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo) is used to fetch data in JSON format.

## Alphavantage API Keys
The free API keys provided by Alphavantage allow only up to 25 requests per day, which for our project with 3 graphs amounts to (25/3=8) website loads before data transmission stops. The demo API key only connects to IBM stock statistics and does not allow selecting specific data sections required by appending a query to the URL. Therefore, data extraction from the provided data array in each day's object is done on my code's side directly. The code file is located here src\components\AppleGraph.jsx. Don't be confused by the file name AppleGraph.jsx; information about Apple stocks within the demo API is not available.
Due to this limitation, I have decided to use API requests only for the IBM stock graph.
The library used for API requests is "axios": "^1.6.8".

Since data for Microsoft and Nvidia graphs is imported directly from the local file 'src\data\stock_mkt_time_data.json', they do not require an API key.

## Formulas
Calculation of percentage change in stock price compared to the previous analogous period is done using the following formula:<br>

($X_2$ - $X_1$) / $X_1$ * 100%, where <br>
$X_1$ - 'close price' of the stock at the end of yesterday (or an analogous period, e.g., last week)<br>
$X_2$ - 'close price' of the stock at the end of today.<br>
The formula answers the question of how much the stock price has changed compared to the analogous period +/-,%.

## Rendering Graphs
The library used for rendering graphs is "react-chartjs-2": "^5.2.0".
Configuration of the library for each graph is done in respective graph files AppleGraph.jsx, MicrosoftGraph.jsx, NvidiaGraph.jsx (hereinafter referred to as "graph files").

## Hooks and State Management
All graph files use state hooks (useState) and effect hooks (useEffect) to track current price and percentage change of stocks.
For example, for Microsoft and Nvidia stocks:
1. First, states are defined (useState):
- currentPrice - to store the current price.
- percentageChange - to store the percentage change in price.
2. Then, an effect is used (useEffect), which runs on component mount (empty dependency array []).
- Inside the effect, the current price (latestPrice) is calculated as the last element of the stock price array.
- The initial price (openPrice) is also defined as the first element of the stock price array.
- After calculations, new values for currentPrice and percentageChange are set using setCurrentPrice and setPercentageChange functions, respectively.
This approach allows dynamically updating component states based on data from the JSON file, providing up-to-date stock price information on component load.

## Data Loading and Error Handling
When loading data in the component src\components\AppleGraph.jsx (IBM graph data), an animated spinner is displayed, which turns off when data is loaded and the graph is rendered.
In case of server failure and inability to load data into the graph, the user sees an alert window with a message about this. Also, a message about this is passed to the browser console.

## Responsive UI/UX and Creativity
The project design is inspired by the US newspaper [FINANCIAL TIMES](https://www.ft.com/). Corresponding colors and fonts are used.
The layout is designed for mob, Tablet PC, PC devices for breakpoints min-width 360px, 768px, 1400px respectively.
CSS files for styling are located in the src\css folder.

## Jest Testing
Testing libraries used:
- "jest": "^27.5.1",

To configure testing:
- "babel-jest": "^29.7.0",
- "@testing-library/jest-dom": "^5.17.0",
- "@testing-library/react": "^13.4.0",
- "@testing-library/user-event": "^13.5.0",

Testing of the spinner functionality during data loading via the open API for IBM statistics is done. To run testing, execute the command npm test in the console. Test file is src\components\AppleGraph.test.jsx
Below is an example of test results. <br>
![](/src/img/Spinner-test.jpg)

## Others
This project was completed within 48 hours and can be rewritten in TypeScript with more time available.

## Contacts
I hope that this test assignment demonstrates a sufficient level of knowledge in React, JS, HTML, CSS, etc.<br>
I am ready to answer any additional questions and look forward to your feedback.

With best regards,<br>
**Maksym Chukhrai**
