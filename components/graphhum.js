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
import { useEffect , useState} from 'react';
import { graphData2 } from '@/app/lib/actions';


export default function Graphhum() {
    const [labels, settime] = useState([])
    const [temparray, settemp] = useState([]);
    

    useEffect(() => {
        let time = []
        let temp = []
        const fetchData = async () => {
            const res = await graphData2()
            res.map(e => {
                const date = new Date(e[0] * 1000);
                time.push(`${ ("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`)

                if (e[1] == null) {
                    temp.push(null)
                }else{
                    temp.push(e[1].toFixed(4))
                }
            })

            settime(time)
            settemp(temp)
        }


        fetchData();
    },[])

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

    const data = {
        labels,
        fill: true,
        datasets: [
            {
                label: 'Hum %',
                data: temparray,
                backgroundColor: 'rgba(100, 200, 150, 0.5)',
            },
        ],
        
    };

    const options={
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                suggestedMin: 0, 
                suggestedMax: 100, 
            },
        },
        plugins: {
          title: {
            display: true,
            text: "Klaasikoda",
          },
        },
    }

    return (
        <div className='flex justify-center m-2'> 
            <div className='w-full min-h-80 relative bg-white rounded-lg shadow-md p-6'>
                <Line data={data} options={options}/>
            </div>
        </div>
        )
};
