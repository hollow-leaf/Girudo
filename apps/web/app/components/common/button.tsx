export function Button(props: {name: string, handler: any}) {
    return (
        <button onClick={props.handler} className="text-white bg-cBlue focus:ring-4 focus:outline-none focus:ring-white/40 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">{props.name}</button>
    )
}