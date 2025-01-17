import React from "react";
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

const LineChartWithLabelsOnPointsNormal = () => {
  // Data for the line chart
  const data = {
    labels: [
      "الأسبوع 1",
      "أسبوع 2",
      "أسبوع 3",
      "أسبوع 4",
      "أسبوع 5",
      "أسبوع 6",
      "أسبوع 7",
    ],
    datasets: [
      {
        label: "Monthly Data", // Label for the dataset
        data: [500, 600, 400, 800, 700, 800, 700], // Data points for the line chart
        borderColor: "rgb(23, 105, 174)", // Color of the line
        backgroundColor: "rgba(23, 105, 174, 0.2)", // Background color beneath the line
        tension: 0, // Curviness of the line
        fill: true, // Fills the area under the line
        pointRadius: 5, // Show points on the line
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Point color
        pointBorderColor: "#fff", // Point border color
        pointHoverRadius: 7, // Radius of points when hovered
        pointHoverBackgroundColor: "rgba(75, 192, 192, 0.8)", // Point color when hovered
      },
    ],
  };

  // Define the options for the line chart
  const options = {
    responsive: true, // Make the chart responsive
    scales: {
      x: {
        display: true, // Hide the x-axis line
        ticks: {
          beginAtZero: true,
        },
      },
      y: {
        display: true, // Hide the y-axis line
        ticks: {
          beginAtZero: true,
        },
      },
    },
    layout: {
      padding: 9,
    },
    plugins: {
      legend: {
        display: false, // Show the legend
        position: "bottom",
        labels: {
          generateLabels: (chart) => {
            const labels = data.labels; // Use the labels for legend
            return labels.map((label, index) => ({
              text: label, // Legend text
              fillStyle: data.datasets[0].borderColor, // Legend color
            }));
          },
        },
      },
      tooltip: {
        enabled: true, // Enables tooltips on hover
      },
      // Configuration for the data labels plugin
      datalabels: {
        display: false, // Always display the labels
        align: "top", // Position the label on top of the point
        color: "black", // Label color
        font: {
          weight: "bold", // Make the label font bold
        },
        formatter: (value, context) => data.labels[context.dataIndex], // Show the corresponding month label
      },
    },
  };

  return <Line data={data} options={options} />;
};

// Export the LineChartWithLabelsOnPoints component
export default LineChartWithLabelsOnPointsNormal;
