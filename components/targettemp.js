"use client"
export default function Targettemp(props) {
    props = props.props
    const data = props[0]
    const client = props[1]

    const tempup = () => {
        console.log("RUNNGIN")
        const targettemp = data.targettemp + 1
            client.publish(`AC/${data.id}/Targettemp`,JSON.stringify(targettemp), { qos: 0, retain: true }, (error) => {
                if (error) {
                    console.error(error)
                }
            })
    }

    const tepmdown = () => {
        console.log("RUNNGIN")
        const targettemp = data.targettemp - 1
            client.publish(`AC/${data.id}/Targettemp`,JSON.stringify(targettemp), { qos: 0, retain: true }, (error) => {
                if (error) {
                    console.error(error)
                }
            })
    }


    return (
        <div className="flex p-2 gap-2 justify-center">
            <button onClick={tempup}>Up |</button>
            <p>{data.targettemp}</p>
            <button onClick={tepmdown}>| Down</button>

        </div>
    )
}
