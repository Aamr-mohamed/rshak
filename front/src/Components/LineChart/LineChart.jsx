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

const LineChartWithLabelsOnPoints = () => {
  // Data for the line chart
  const data = {
    labels: ["الكل", "سنه", "6 شهور", "3 شهور", "شهر"],
    datasets: [
      {
        label: "Monthly Data", // Label for the dataset
        data: [116, 113, 110, 120, 120, 110, 120, 120], // Data points for the line chart
        borderColor: "rgb(23, 105, 174)", // Color of the line
        backgroundColor: "rgba(23, 105, 174, 0.2)", // Background color beneath the line
        tension: 0.6, // Curviness of the line
        fill: true, // Fills the area under the line
        pointRadius: 1, // Show points on the line
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Point color
        pointBorderColor: "#fff", // Point border color
        pointHoverRadius: 7, // Radius of points when hovered
        pointHoverBackgroundColor: "rgba(75, 192, 192, 0.8)", // Point color when hovered
      },
    ],
  };
  let arrData = data.datasets[0].data;
  const minValue = Math.min(...arrData) - 20; // Subtract 20 from the lowest value
  const maxValue = Math.max(...arrData) + 20;
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
            const labels = data.labels; // Use the labels for legend
            return labels.map((label, index) => ({
              text: label, // Legend text
              fillStyle: data.datasets[0].borderColor, // Legend color
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

  return <Line data={data} options={options} />;
};

// Export the LineChartWithLabelsOnPoints component
export default LineChartWithLabelsOnPoints;
