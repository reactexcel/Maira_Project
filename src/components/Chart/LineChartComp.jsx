import PropTypes from 'prop-types';
import { Stack } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
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
          callback: function (index) {
            return yLabels[index];
          },
        },
      },
    },
  };

  return (
    <Stack sx={{ width: { lg: '33%', md: '49%', xs: '100%' } }}>
      <Line data={data} options={options} />
    </Stack>
  );
}

LineChartComp.propTypes = {
  datasetsLabel: PropTypes.string.isRequired,
  yLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataSet: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};
