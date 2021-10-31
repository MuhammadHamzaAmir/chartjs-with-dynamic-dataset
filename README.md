# **ChartJS wirh dynamic dataset**

In this tutorial we are going to build a dynamic graph/chart generator based o data with ChartJS.

## **Prerequisites**

-  Docker
-  Docker Compose
-  Node
-  Database (we will use PostgreSQL) with sample data
-  Cube.js backend to handle communications between database and frontend
-   Chart.js to generate charts and graphs.
-  Frontend application (we will build one with HTML/CSS)

## **Overview**

To get this demo you will need to have Node and npm installed on your machine. The instructions to setup Node and npm can be found online.

![Dynamic Chart/Graph](media/main.png)

## **Implementation**

1. Clone the repository & open the repository root directory in terminal.

2. Run the below command to install cubejs-cli

```
npm -g install cubejs-cli
```

3. Next run the below npm command to install the dependencies listed in the package.json file

```
npm install
```

4. Current configurations are set to support postgres database defined in docker-compose.yml. Now to run the Docker with Cube.js and Postgres database. Run the following commnand

```
docker compose up -d
```
5. For data in our database, run the following command to dump the data in the database.

```
docker exec postgres bash -c "psql --db ecom -f ecom-dump.sql -U postgres"
```
6. Goto http://localhost:4000. We can see data in our database. Now, we can generate schema for our data.

![Dynamic Chart](media/data.png)

7. To observe a graph/chart generated from static data. We will comment out the following code in the *.src/index.js* file.

```
cubejsApi
  .load({
    measures: ["Orders.count"],
    timeDimensions: [
      {
        dimension: "Orders.createdAt",
        granularity: `day`,
        dateRange: [`08/01/2020`, `09/01/2020`],
      },
    ],
  })
  .then((resultSet) => {
    new Chart(document.getElementById("chart"), {
      type: "line",
      options: {},
      data: chartJsData(resultSet),
    });
  });
```
The following code will be commented in *.src/index.js* file.

```
let chart;

var drawChart = function (startDate, endDate) {
    cubejsApi
        .load({
            measures: ["Orders.count"],
            timeDimensions: [
                {
                    dimension: "Orders.createdAt",
                    granularity: `day`,
                    dateRange: [startDate, endDate],
                },
            ],
        })
        .then((resultSet) => {
            if (chart) {
                chart.data = chartJsData(resultSet);
                chart.update();
            } 
            else {
                chart = new Chart(document.getElementById("chart"), {type: "line",options: {},data: chartJsData(resultSet),});
            }
        });
};
const MIN_DATE = "2020-08-01";
const MAX_DATE = "2020-09-01";

flatpickr("#dates", {
    mode: "range",
    dateFormat: "Y-m-d",
    defaultDate: [MIN_DATE, MAX_DATE],

    onChange: function (selectedDates) {
        if (selectedDates.length === 2) {
            drawChart(selectedDates[0], selectedDates[1]);
        }
    },
});

drawChart(MIN_DATE, MAX_DATE);
```

8. Now, for our frontend, goto http://localhost:1235. Our server is running in a dockor container. We will see a static graph generated from static data.

![Dynamic Graph](media/static.png)

9. We can observe charts/graphs created dynamically from dynamic data. For this, comment out the following code in *.src/index.js* file.

```
let chart;

var drawChart = function (startDate, endDate) {
    cubejsApi
        .load({
            measures: ["Orders.count"],
            timeDimensions: [
                {
                    dimension: "Orders.createdAt",
                    granularity: `day`,
                    dateRange: [startDate, endDate],
                },
            ],
        })
        .then((resultSet) => {
            if (chart) {
                chart.data = chartJsData(resultSet);
                chart.update();
            } 
            else {
                chart = new Chart(document.getElementById("chart"), {type: "line",options: {},data: chartJsData(resultSet),});
            }
        });
};
const MIN_DATE = "2020-08-01";
const MAX_DATE = "2020-09-01";

flatpickr("#dates", {
    mode: "range",
    dateFormat: "Y-m-d",
    defaultDate: [MIN_DATE, MAX_DATE],

    onChange: function (selectedDates) {
        if (selectedDates.length === 2) {
            drawChart(selectedDates[0], selectedDates[1]);
        }
    },
});

drawChart(MIN_DATE, MAX_DATE);
```
The following code will be commented in *.src/index.js* file.

```
cubejsApi
  .load({
    measures: ["Orders.count"],
    timeDimensions: [
      {
        dimension: "Orders.createdAt",
        granularity: `day`,
        dateRange: [`08/01/2020`, `09/01/2020`],
      },
    ],
  })
  .then((resultSet) => {
    new Chart(document.getElementById("chart"), {
      type: "line",
      options: {},
      data: chartJsData(resultSet),
    });
  });
```

10. Now, goto http://localhost:1235. Our server is running in a dockor container. We will see a dynamic graph generated from dynamic data.

![Dynamic Graph](media/dynamic-1.png)

11. We can generate different graphs/chats dynamically by selecting different date. Then the graph will be generated dynamically from the data.

![Dynamic Graph date](media/dynamic-2.png)

## **Working**

1. Our system works using docker containers. There are three containers:
	- Node
	- Cube
	- Postgres

2. Node container handles the frontend of the system. On system startup, it serves the frontend functionality of the system. Frontend includes the following files:
	- *.src/index.js*
	- *.src/styles.css*
	- *./index.html*
3. *.src/index.js* file handles the API calls from the backend. It sends and receives the data via API call from the backend. It dynamically generates charts/graphs using ChartJS from the received data from backend.
4. *.src/styles.css* handles the styling of our frontend. *./index.html* displays generated charts/graphs.
5. Cube container handles the requests between backend and frontend. It recevies requests from frontend or say Node container, then it sends resposes from backend or say Postgres conatiner based upon the request.
6. Postgres container handles the database of the system. It is the backend of the system. It receives requests from Cube container and send responses to Cube based upon the requests.
## **Concluson**

If you’ve followed the above steps, then you’ve now created, configured, and started a Dynamic Graph/Chart generator using ChartJs and you’re well on your way to taking full advantage of ChartJs as a solution to a variety of Grpahs/Charts needs.