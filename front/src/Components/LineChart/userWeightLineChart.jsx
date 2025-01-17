import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the data labels plugin
import axios from "axios";

// Register the necessary components, including the data labels plugin
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ChartDataLabels,
);

const UserWeightChart = ({ userId }) => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    const fetchWeightData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/weight/${userId}`);
        const weights = response.data.weights;
        console.log("weights", weights);

        const data = {
          labels: ["الكل", "سنه", "6 شهور", "3 شهور", "شهر"],
          datasets: [
            {
              label: "الوزن",
              data: weights,
              borderColor: "rgb(23, 105, 174)",
              backgroundColor: "rgba(23, 105, 174, 0.2)",
              tension: 0.6,
              fill: true,
              pointRadius: 1,
              pointBackgroundColor: "rgba(75, 192, 192, 1)",
              pointBorderColor: "#fff",
              pointHoverRadius: 7,
              pointHoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error("Error fetching weight data:", error);
      }
    };

    if (userId) {
      fetchWeightData();
    }
  }, [userId]);

  if (!chartData) {
    return <div>Loading...</div>;
  }
  // Data for the line chart
  // const data = {
  //   labels: ["الكل", "سنه", "6 شهور", "3 شهور", "شهر"],
  //   datasets: [
  //     {
  //       label: "Monthly Data", // Label for the dataset
  //       data: [116, 113, 110, 120, 120, 110, 120, 120], // Data points for the line chart
  //       borderColor: "rgb(23, 105, 174)", // Color of the line
  //       backgroundColor: "rgba(23, 105, 174, 0.2)", // Background color beneath the line
  //       tension: 0.6, // Curviness of the line
  //       fill: true, // Fills the area under the line
  //       pointRadius: 1, // Show points on the line
  //       pointBackgroundColor: "rgba(75, 192, 192, 1)", // Point color
  //       pointBorderColor: "#fff", // Point border color
  //       pointHoverRadius: 7, // Radius of points when hovered
  //       pointHoverBackgroundColor: "rgba(75, 192, 192, 0.8)", // Point color when hovered
  //     },
  //   ],
  // };
  const minValue = Math.min(...chartData.datasets[0].data) - 20;
  const maxValue = Math.max(...chartData.datasets[0].data) + 20;
  // Define the options for the line chart
  const options = {
    responsive: true, // Make the chart responsive
    scales: {
      x: {
        display: false, // Hide the x-axis line
        ticks: {
          beginAtZero: false,
        },
      },
      y: {
        display: false, // Hide the y-axis line
        min: minValue,
        max: maxValue,
        ticks: {
          stepSize: 20, // Controls the space between ticks
          beginAtZero: false, // Optionally, you can set this to true to start the scale at zero
        },
      },
    },
    layout: {
      padding: 24,
    },
    plugins: {
      legend: {
        display: true, // Show the legend
        position: "bottom",
        labels: {
          generateLabels: (chart) => {
            const labels = chartData.labels; // Use the labels for legend
            return labels.map((label, index) => ({
              text: label, // Legend text
              fillStyle: chartData.datasets[0].borderColor, // Legend color
            }));
          },
        },
      },
      // listeners: {
      //   click: function (context) {
      //     if (isSelected(context)) {
      //       deselect(context);
      //     } else {
      //       select(context);
      //     }
      //
      //     return true;
      //   },
      // },
      tooltip: {
        enabled: true, // Enables tooltips on hover
      },
      // Configuration for the data labels plugin
      datalabels: {
        display: true, // Always display the labels
        formatter: (value, context) => value,
        align: "top", // Position the label on top of the point
        anchor: "end", // Position the label at the end of the point
        textAlign: "center",
        color: "white", // Label color
        padding: {
          top: 8, // Padding from the top of the point
          bottom: 8, // Padding from the bottom of the point
          left: 12, // Padding from the left of the point
          right: 12, // Padding from the right of the point
        },
        backgroundColor: "#1769AE", // Background
        borderRadius: 9, // Border radius
        font: {
          weight: "bold", // Make the label font bold
          size: 12,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

// Export the LineChartWithLabelsOnPoints component
export default UserWeightChart;
