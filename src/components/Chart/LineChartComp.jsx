import { Stack } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChartComp({
  datasetsLabel,
  yLabels,
  dataSet,
  labels,
}) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: datasetsLabel,
        data: dataSet,
        fill: false,
        tension: 0.1,
        borderColor: "black",
        backgroundColor: ["yellow", "pink", "red"],
        width: "100%",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 2,
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          callback: function ( index) {
            return yLabels[index];
          },
        },
      },
    },
  };

  return (
    <Stack sx={{ width: { md: "450px", xs: "100%" } }}>
      <Line data={data} options={options} />
    </Stack>
  );
}
