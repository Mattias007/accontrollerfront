"use client"
import {  Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';


export default function Graph() {




    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
      );

    const labels = ['12', '13', '14', '15'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Temp',
                data: [1,2,3,4],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Hum',
                data: [4,3,2,1],
                backgroundColor: 'rgba(123, 22, 89, 0.9)',
            },
        ],
    };
    
    return (

        <Line data={data} />
        )
};
