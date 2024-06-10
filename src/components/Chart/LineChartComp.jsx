import PropTypes from "prop-types";
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


const backgroundPlugin = {
  id: "backgroundPlugin",
  beforeDraw: (chart) => {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
    } = chart;

    const sectionHeight = (bottom - top) / 3;

    ctx.save();

    // Light Red background (bottom third)
    ctx.fillStyle = "#F17272";
    ctx.fillRect(left, bottom - sectionHeight, right - left, sectionHeight);

    // Light Yellow background (middle third)
    ctx.fillStyle = "#F3F39D";
    ctx.fillRect(left, bottom - 2 * sectionHeight, right - left, sectionHeight);

    // Light Green background (top third)
    ctx.fillStyle = "#9BEBBB";
    ctx.fillRect(left, top, right - left, sectionHeight);

    ctx.restore();
  },
};

ChartJS.register(backgroundPlugin);

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
        backgroundColor: ["#F3F39D", "#9BEBBB", "#F17272"],
        borderWidth: 2,
        pointBackgroundColor: "white",
        pointBorderColor: "black",
        pointBorderWidth: 3,
        pointRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        min: -0.1,
        max: 2.05,
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          callback: function (index) {
            return yLabels[index];
          },
        },
      },
    },
    plugins: {
      backgroundPlugin: true,
    },
  };

  return (
    <Stack sx={{ width: { lg: "33%", md: "49%", xs: "100%" } }}>
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
