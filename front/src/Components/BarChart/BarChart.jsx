import React from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
	const data = {
		labels: ["Q1", "Q2", "Q3", "Q4"], // Labels for each bar (quarters in this example)
		datasets: [
			{
				label: "Sales", // Label for the dataset
				data: [3, 5, 4, 6], // Data points for the bar chart
				backgroundColor: [
					"rgb(243, 57, 97)",
					"rgb(30, 164, 163)",
					"rgb(129, 208, 73)",
					"rgb(23, 105, 174)",
				],
				borderColor: [
					"rgb(243, 57, 97)",
					"rgb(30, 164, 163)",
					"rgb(129, 208, 73)",
					"rgb(23, 105, 174)",
				],
				borderWidth: 1, // Width of the border for each bar
				borderRadius: 5, // Rounded corners for each bar
				spacing: 1,
				fontWeight: "bold", // Bold font for the labels
			},
		],
	};

	// Define the options for the bar chart
	const options = {
		responsive: true, // Make the chart responsive
		plugins: {
			legend: {
				position: "left", // Position of the legend
				display: false,
				labels: {
					// Hide the labels for the legend
					font: {
						size: 14,
						weight: "bold",
					},
				},
			},
			datalabels: {
				display: false, // Hide data labels on the segments
			},
		},
		scales: {
			x: {
				beginAtZero: true, // Start x-axis at zero
				grid: {
					display: false
				}
			},
			y: {
				beginAtZero: true, // Start y-axis at zero
				grid: {
					display: false
				},
				ticks: {
					// Use a custom callback to display words instead of numbers
					callback: function(value) {
						// Map of numeric values to corresponding words
						const valueToWordMap = {
							1: "1 مستخدم",
							2: "2 مستخدم",
							3: "3 مستخدم",
							4: "4 مستخدم",
							5: "5 مستخدم",
							6: "6 مستخدم",
						};
						// Return the word corresponding to the value
						return valueToWordMap[value] || "";
					},
				},
			},
		},
	};

	return (
		<div className="w-[500px] h-[400px] flex justify-center items-center">
			<Bar data={data} options={options} />
		</div>
	);
};

// Export the BarChart component
export default BarChart;
