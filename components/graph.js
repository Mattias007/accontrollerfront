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
import { graphData, graphData2 } from '@/app/lib/actions';


export default function Graph() {
    const [labels, settiem] = useState([])
    const [temparray, settemp] = useState([]);
    const [humarray, sethum] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {
        let time = []
        let temp = []
        let hum = []
        const fetchData = async () => {
            const res = await graphData()
            res.map(e => {
                const date = new Date(e[0] * 1000);
                time.push(`${date.getHours()}:${date.getMinutes()}`)
                if (e[1] == null) {
                    temp.push(null)
                }else{
                    temp.push(e[1].toFixed(4))
                }
            })

            const res2 = await graphData2()
            res2.map(e => {
                if (e[1] == null) {
                    hum.push(null)
                }else{
                    hum.push(e[1].toFixed(4))
                }
            })

            settiem(time)
            settemp(temp)
            sethum(hum);
            setIsLoading(false);
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
        datasets: [
            {
                label: 'Temp C',
                data: temparray,
                backgroundColor: 'rgba(255, 1, 126, 0.5)',
            },
            {
                label: 'Hum %',
                data: humarray,
                backgroundColor: 'rgba(25, 125, 25, 0.5)',
            },
        ],
    };

    console.log(labels)
    if (isLoading) {
        return
    }

    return (
        <div className='p-4 w-full'>
            <Line data={data} />
        </div>
        )
};
