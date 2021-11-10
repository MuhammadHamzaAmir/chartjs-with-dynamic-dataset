import moment from "moment";
import cubejs from "@cubejs-client/core";
import Chart from "chart.js/auto";
import flatpickr from "flatpickr";
import "./styles.css";

const cubejsApi = cubejs(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTQ2NjY4OTR9.0fdi5cuDZ2t3OSrPOMoc3B1_pwhnWj4ZmM3FHEX7Aus",
    {
        apiUrl:"http://localhost:4000/cubejs-api/v1",
    }
);
let chart;

// var drawChart = function (startDate, endDate) {
//     cubejsApi
//         .load({
//             measures: ["Orders.count"],
//             timeDimensions: [
//                 {
//                     dimension: "Orders.createdAt",
//                     granularity: `day`,
//                     dateRange: [startDate, endDate],
//                 },
//             ],
//         })
//         .then((resultSet) => {
//             if (chart) {
//                 chart.data = chartJsData(resultSet);
//                 chart.update();
//             } 
//             else {
//                 chart = new Chart(document.getElementById("chart"), {type: "line",options: {},data: chartJsData(resultSet),});
//             }
//         });
// };
// const MIN_DATE = "2020-08-01";
// const MAX_DATE = "2020-09-01";

// flatpickr("#dates", {
//     mode: "range",
//     dateFormat: "Y-m-d",
//     defaultDate: [MIN_DATE, MAX_DATE],

//     onChange: function (selectedDates) {
//         if (selectedDates.length === 2) {
//             drawChart(selectedDates[0], selectedDates[1]);
//         }
//     },
// });

// drawChart(MIN_DATE, MAX_DATE);

// cubejsApi
//   .load({
//     measures: ["Orders.count"],
//     timeDimensions: [
//       {
//         dimension: "Orders.createdAt",
//         granularity: `day`,
//         dateRange: [`08/01/2020`, `09/01/2020`],
//       },
//     ],
//   })
//   .then((resultSet) => {
//     new Chart(document.getElementById("chart"), {
//       type: "line",
//       options: {},
//       data: chartJsData(resultSet),
//     });
//   });

// cubejsApi.load({
//   dimensions: ["Orders.status", "Users.company"],
//   timeDimensions: [
//     {
//       dimension: "Orders.createdAt",
//     },
//   ],
//   order: [["Users.company", "asc"]],
//   measures: ["Orders.count"],
// })
//   .then((resultSet) => {
//     new Chart(document.getElementById("chart"), {
//       type: "bar",
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//       data: chartJsData_hasmany_bars(resultSet),
//     });
//   });

// cubejsApi
//   .load({
    // measures: ["PostTopics.count"],
    // timeDimensions: [],
    // order: {
    //   "PostTopics.count": "desc",
    // },
    // filters: [],
    // dimensions: ["Topics.topics"],
//   })
//   .then((resultSet) => {
//     new Chart(document.getElementById("chart"), {
//       type: "bar",
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//       data: chartJsData_many_to_many(resultSet),
//     });
//   });


cubejsApi
  .load({
    measures: ["Campaigns.count"],
    timeDimensions: [],
    order: {
      "Campaigns.count": "desc",
    },
    filters: [],
    dimensions: ["Email.campaignName"],
  })
  .then((resultSet) => {
    new Chart(document.getElementById("chart"), {
      type: "bar",
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
      data: chartJsData_many_to_many_without_table(resultSet),
    });
  });
var chartJsData = function (resultSet) {
    console.log(resultSet.categories());
    return {
        datasets: [
            {
                label: "Orders Count",
                data: resultSet.chartPivot().map(function (r) {
                    return r["Orders.count"];
                }),
                backgroundColor: "rgb(255, 99, 132)",
            },
        ],
        labels: resultSet.categories().map(function (c) {
            return moment(c.x).format("DD MMM");
            }),
    };
};
var chartJsData_hasmany_bars = function (resultSet) {
    console.log(resultSet.categories())
  return {
    datasets: [
      {
        label: "Orders Count",
        data: resultSet.chartPivot().map(function (r) {
          return r["Orders.count"];
        }),
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
    labels: resultSet.categories().map(function (c) {
      return c.xValues[1];
    }),
  };
};
var chartJsData_many_to_many = function (resultSet) {
  console.log(resultSet.categories());
  return {
    datasets: [
      {
        label: "Post Topics Count",
        data: resultSet.chartPivot().map(function (r) {
          return r["PostTopics.count"];
        }),
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
    labels: resultSet.categories().map(function (c) {
      return c.x;
    }),
  };
};

var chartJsData_many_to_many_without_table = function (resultSet) {
  console.log(resultSet.categories());
  return {
    datasets: [
      {
        label: "Campaign Count",
        data: resultSet.chartPivot().map(function (r) {
          return r["Campaigns.count"];
        }),
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
    labels: resultSet.categories().map(function (c) {
      return c.x;
    }),
  };
};
