import React from "react";
import { Pie } from "react-chartjs-2";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	Title,
} from "chart.js";

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
	// Data for the pie chart
	const data = {
		labels: ["Red", "Blue", "Yellow", "Green", "Purple"], // Labels for the segments
		datasets: [
			{
				label: "Votes", // Label for the dataset
				data: [12, 19, 3, 5, 2], // Data points for the pie chart
				backgroundColor: [
					"rgb(243, 57, 97)",
					"rgb(57, 206, 243)",
					"rgb(131, 168, 247)",
					"rgb(132, 209, 76)",
				],
				borderColor: [
					"rgb(243, 57, 97)",
					"rgb(57, 206, 243)",
					"rgb(131, 168, 247)",
					"rgb(132, 209, 76)",
				],
				borderWidth: 1, // Width of the segment borders
			},
		],
	};

	// Define the options for the pie chart
	const options = {
		responsive: true, // Make the chart responsive
		plugins: {
			legend: {
				position: "top", // Position of the legend
			},
			title: {
				display: true,
				text: "Distribution of Votes", // Title of the chart
			},
			datalabels: {
				display: false, // Hide data labels on the segments
			},
		},
	};

	return (
		<Pie data={data} options={options} />
	);
};

// Export the PieChart component
export default PieChart;
