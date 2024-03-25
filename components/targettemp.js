"use client"
export default function Targettemp(props) {
    props = props.props
    const data = props[0]
    const client = props[1]
    const temp = ((data.targettemp - 32) * 5/9).toFixed(2)


    const tempup = () => {
        const targettemp = data.targettemp + 1
            client.publish(`AC/${data.id}/Targettemp`,JSON.stringify(targettemp), { qos: 0, retain: true }, (error) => {
                if (error) {
                    console.error(error)
                }
            })
    }

    const tepmdown = () => {
        const targettemp = data.targettemp - 1
            client.publish(`AC/${data.id}/Targettemp`,JSON.stringify(targettemp), { qos: 0, retain: true }, (error) => {
                if (error) {
                    console.error(error)
                }
            })
    }


    return (
        <div className="flex p-2 gap-2 justify-center items-center">
            <button className="p-2 flex-1 rounded-xl shadow hover:bg-sky-400 bg-sky-100" onClick={tempup}>Up</button>
            <p className="flex-1 text-center text-lg">{temp}°C</p>
            <button className="p-2 flex-1 rounded-xl shadow hover:bg-sky-400 bg-sky-100" onClick={tepmdown}>Down</button>

        </div>
    )
}
