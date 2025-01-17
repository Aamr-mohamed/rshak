import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const CommonMedicineChart = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchMedicineData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/medicines`);
        const medicine = response.data.medicines;
        console.log("medicine", medicine);

        // Filter out diseases with 0 percentage
        const filteredData = medicine.filter(
          (type) => parseFloat(type.percentage) > 0,
        );

        const labels = filteredData.map((item) => item.medicine);
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
          setChartData({
            data,
            totalMedicines: filteredData.length,
          }); // Add total disease count
        } else {
          const data = {
            labels,
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
          setChartData({
            data,
            totalMedicines: filteredData.length,
          }); // Add total disease count
        }
      } catch (error) {
        console.error("Error fetching disease data:", error);
      }
    };

    fetchMedicineData();
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

      const totalMedicines = chartData.totalMedicines; // Get total number of diseases

      ctx.font = "bold 24px Arial";
      ctx.fillStyle = "#333";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(totalMedicines, width / 2, height / 2); // Display total diseases in the center
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

export default CommonMedicineChart;
