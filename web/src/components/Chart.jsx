import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



export function Chart({dataset}) {  
const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monitoring Chart Temperature and Humidity',
      },
    },
  };
    
   const labels = dataset.data?.map((item) => item?.created_at.slice(11,16));
  
   const data = {
    labels,
    datasets: [
      {
        label: 'Temperature',
        data: dataset.data?.map((item) => item?.temp),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Humidity',
        data: dataset.data?.map((item) => item?.humidity),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  
  return <>
  <div className='mt-10'>
    {
      dataset.data?.length > 0 ? <Line data={data} options={options} /> : (      
        // animate pulse
        <div className="h-[400px] w-full animate-pulse rounded-lg mt-10 bg-gray-300 bg-opacity-40"></div>        
      )
    }
  </div>
  </>;
}
