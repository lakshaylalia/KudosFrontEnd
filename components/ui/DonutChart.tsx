import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

interface KudosDonutChartProps {
  kudosData: number[];
}

const KudosDonutChart = ({ kudosData }: KudosDonutChartProps) => {
  const data = {
    labels: ["Total Events", "Completed Events", "Kudos Earned"],
    datasets: [
      {
        data: kudosData,
        backgroundColor: ["#4CAF50", "#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#388E3C", "#D32F2F", "#1976D2"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Doughnut data={data} options={options} />;
};

export default KudosDonutChart;
