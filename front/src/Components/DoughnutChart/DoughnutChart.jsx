import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const AgesChart = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    const fetchWeightData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/ages`);
        const ages = response.data.ages;
        console.log("ages", ages);

        // Filter out ranges with 0 percentage and map to labels and percentages
        const filteredData = ages
          .filter((age) => parseFloat(age.percentage) > 0) // Keep only non-zero percentages
          .map((age) => ({
            label: getArabicLabel(age.range), // Convert range to Arabic label
            percentage: parseFloat(age.percentage),
          }));

        // Separate filtered data into labels and percentages
        const labels = filteredData.map((item) => item.label);
        const percentages = filteredData.map((item) => item.percentage);
        if (percentages.length === 0) {
          // No data case
          setChartData({
            labels: ["لا يوجد مستخدمين حتى الآن"],
            datasets: [
              {
                label: "لا يوجد مستخدمين حتى الآن",
                data: [1],
                backgroundColor: ["#d3d3d3"], // Gray color
                borderColor: ["#d3d3d3"], // Gray border color
                borderWidth: 0,
              },
            ],
          });
        } else {
          setChartData({
            labels, // Use filtered labels
            datasets: [
              {
                label: "النسب",
                data: percentages, // Use filtered percentages
                backgroundColor: [
                  "rgb(255, 91, 30)",
                  "rgb(243, 57, 97)",
                  "rgb(57, 116, 243)",
                  "rgb(152, 216, 94)",
                  "rgb(57, 206, 243)",
                ].slice(0, percentages.length), // Adjust color count
                borderColor: [
                  "rgb(255, 91, 30)",
                  "rgb(243, 57, 97)",
                  "rgb(57, 116, 243)",
                  "rgb(152, 216, 94)",
                  "rgb(57, 206, 243)",
                ].slice(0, percentages.length), // Adjust border color count
                borderWidth: 0, // Width of the segment borders
                spacing: 18,
                borderRadius: 15,
                aspectRatio: 1,
              },
            ],
          });
        }

        // const data = ;

        // setChartData(data);
      } catch (error) {
        console.error("Error fetching weight data:", error);
      }
    };

    // Helper function to map range to Arabic label
    const getArabicLabel = (range) => {
      switch (range) {
        case "36+":
          return "من 36 فما فوق";
        case "31-35":
          return "من 31 الي 35";
        case "26-31":
          return "من 26 ل 30";
        case "21-25":
          return "من 21 ل 25";
        case "15-20":
          return "من 15 ل 20";
        default:
          return range;
      }
    };
    fetchWeightData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }
  // const data = {
  //   labels: [
  //     "من 31 الي 35",
  //     "من 36 فيما قوق",
  //     "من 26 الي 30",
  //     "من 15 الي 20",
  //     "من 21 الي 25",
  //   ], // Labels for the chart
  //   datasets: [
  //     {
  //       label: "Votes", // Label for the dataset
  //       data: [12, 19, 3, 5, 2], // Data points for the doughnut chart
  //       backgroundColor: [
  //         "rgb(255, 91, 30)",
  //         "rgb(243, 57, 97)",
  //         "rgb(57, 116, 243)",
  //         "rgb(152, 216, 94)",
  //         "rgb(57, 206, 243)",
  //       ],
  //       borderColor: [
  //         "rgb(255, 91, 30)",
  //         "rgb(243, 57, 97)",
  //         "rgb(57, 116, 243)",
  //         "rgb(152, 216, 94)",
  //         "rgb(57, 206, 243)",
  //       ],
  //       borderWidth: 0, // Width of the segment borders
  //       spacing: 18,
  //       borderRadius: 15,
  //       aspectRatio: 1,
  //     },
  //   ],
  // };

  // Define the options for the doughnut chart
  const options = {
    maintainAspectRatio: false,
    layout: {
      padding: 48,
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        formatter: (value, context) => {
          const total = context.dataset.data.reduce(
            (acc, curr) => acc + curr,
            0,
          ); // Calculate total
          const percentage = ((value / total) * 100).toFixed(1); // Calculate percentage
          const label = context.chart.data.labels[context.dataIndex]; // Get the corresponding label
          return `${percentage}%\n${label}`;
        },
        align: "end",
        anchor: "end",
        textAlign: "center",
        padding: {
          top: 8,
          bottom: 8,
          left: 12,
          right: 12,
        },
        color: (context) => {
          const dataset = context.dataset;
          const dataIndex = context.dataIndex;
          return dataset.backgroundColor[dataIndex];
        },
        font: {
          weight: "bold",
          size: 15,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

// Export the DoughnutChart component
export default AgesChart;
