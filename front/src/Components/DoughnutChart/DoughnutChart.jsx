import React from "react";
import { Doughnut } from "react-chartjs-2";

import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = () => {
	const data = {
		labels: ["من 31 الي 35", "من 36 فيما قوق", "من 26 الي 30", "من 15 الي 20", "من 21 الي 25"], // Labels for the chart
		datasets: [
			{
				label: "Votes", // Label for the dataset
				data: [12, 19, 3, 5, 2], // Data points for the doughnut chart
				backgroundColor: [
					"rgb(255, 91, 30)",
					"rgb(243, 57, 97)",
					"rgb(57, 116, 243)",
					"rgb(152, 216, 94)",
					"rgb(57, 206, 243)",
				],
				borderColor: [
					"rgb(255, 91, 30)",
					"rgb(243, 57, 97)",
					"rgb(57, 116, 243)",
					"rgb(152, 216, 94)",
					"rgb(57, 206, 243)",
				],
				borderWidth: 0, // Width of the segment borders
				spacing: 18,
				borderRadius: 15,
				aspectRatio: 1,
			},
		],
	};

	// Define the options for the doughnut chart
	const options = {
		responsive: true, // Make the chart responsive
		plugins: {
			legend: {
				position: "top", // Position of the legend
			},
			datalabels: {
				display: false, // Hide data labels on the segments
			},
		},
	};

	return (
		<Doughnut data={data} options={options} />
	)
};

// Export the DoughnutChart component
export default DoughnutChart;
