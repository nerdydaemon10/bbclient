import { Bar, Line } from "react-chartjs-2"
import { faker } from "@faker-js/faker"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js'

export const options = {
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['Customers', 'Employees', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(50, 50, 50)',
      backgroundColor: 'rgba(40, 44, 52, 0.5)',
    },
  ],
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ChartsContainer() {
  return (
    <div className="charts-container gap-2">
      <SalesChart />
      <SalesChart />
    </div>
  )
}

function SalesChart() {
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h6 className="text-body-primary fw-semibold mb-0">Collections</h6>
        </div>
        <div className="btn-group">
          <button className="btn btn-outline-dark">Weekly</button>
          <button className="btn btn-dark">Monthly</button>
          <button className="btn btn-outline-dark">Anually</button>
        </div>
      </div>
      <div className="card-body">
        <Bar
          options={options} 
          data={data} 
        />
      </div>
    </div>
  )
}

export default ChartsContainer