import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const CommonDiseaseChart = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchDiseaseData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/diseases`);
        const diseases = response.data.diseases;
        console.log("diseases", diseases);

        // Filter out diseases with 0 percentage
        const filteredData = diseases.filter(
          (type) => parseFloat(type.percentage) > 0,
        );

        // Map diseases to labels and percentages
        const labels = filteredData.map((item) => item.disease); // Use disease names for labels
        console.log("labels", labels);
        const percentages = filteredData.map((item) =>
          parseFloat(item.percentage),
        );

        if (percentages.length === 0) {
          const data = {
            labels: ["لا يوجد مستخدمين حتى الآن"],
            datasets: [
              {
                label: "النسب",
                data: [1],
                backgroundColor: ["#d3d3d3"], // Gray color
                borderColor: ["#d3d3d3"], // Gray border color
                borderWidth: 0,
              },
            ],
          };
          setChartData({ data, totalDiseases: 0 });
        } else {
          const data = {
            labels, // Disease names
            datasets: [
              {
                label: "النسب",
                data: percentages, // Percentages
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
                borderWidth: 0,
                spacing: 18,
                borderRadius: 15,
                aspectRatio: 1,
              },
            ],
          };

          setChartData({ data, totalDiseases: filteredData.length }); // Add total disease count
        }
      } catch (error) {
        console.error("Error fetching disease data:", error);
      }
    };

    fetchDiseaseData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  const options = {
    maintainAspectRatio: false,
    cutout: "90%",
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

  // const options = {
  //   maintainAspectRatio: false,
  //   cutout: "90%",
  //   layout: {
  //     padding: 48,
  //   },
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     tooltip: {
  //       enabled: true,
  //     },
  //   },
  // };

  // Custom plugin to draw the total number of diseases in the center
  const countIndicesPlugin = {
    id: "countIndices",
    beforeDraw: (chart) => {
      const { width } = chart;
      const { height } = chart;
      const ctx = chart.ctx;
      ctx.save();

      const totalDiseases = chartData.totalDiseases; // Get total number of diseases

      ctx.font = "bold 24px Arial";
      ctx.fillStyle = "#333";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(totalDiseases, width / 2, height / 2); // Display total diseases in the center
    },
  };

  return (
    <Doughnut
      data={chartData.data}
      options={options}
      plugins={[countIndicesPlugin]}
    />
  );
};

export default CommonDiseaseChart;
