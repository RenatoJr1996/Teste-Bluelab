import { MouseEventHandler } from "react"

interface Props{
    onClick: MouseEventHandler<HTMLButtonElement>
    title: string
}


export function Button({onClick, title}: Props){
    return(
        <button onClick={onClick} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">{title}</button>
    )
}