

export default function Climetbutton(props) {
    props = props.props
    const commands = props[0]
    const fulldata = props[1]
    const client = props[2]

    const handlePublish = (data, command) => {
            data.command = command
            client.publish(`AC/${data.id}/Command`, JSON.stringify(data.command), { qos: 0, retain: true }, (error) => {
                if (error) {
                    console.error(error)
                }
            })
    };

  return (
    <button className={"p-2 rounded-xl shadow hover:bg-sky-400 " + (fulldata.command == props[0][1] ? 'bg-sky-300' :'bg-sky-100')} onClick={() => handlePublish(fulldata, commands[1])}>{commands[0]}</button>

  )
}
 
