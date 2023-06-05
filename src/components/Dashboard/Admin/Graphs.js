import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      type: 'line',
      label: 'Artworks',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      data: labels.map(() => faker.datatype.number({ min: 0, max: 500 }))
    },
    {
      type: 'bar',
      label: 'Users',
      backgroundColor: 'rgb(75, 192, 192)',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
      borderColor: 'white',
      borderWidth: 2
    },
    {
      type: 'bar',
      label: 'Artists',
      backgroundColor: 'rgb(53, 162, 235)',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 500 }))
    }
  ]
};

// const options = {
//   maintainAspectRatio: false // Don't maintain w/h ratio
// };

//Component to renders different graphs on admin page
const Graphs = () => {
  return (
    <div className="">
      <Chart
        width={700}
        height={400}
        type="bar"
        className="rounded-xl bg-white mt-10 p-3 shadow-all"
        data={data}
      />
    </div>
  );
};

export default Graphs;
