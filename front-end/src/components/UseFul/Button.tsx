import { ButtonHTMLAttributes, forwardRef} from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
    title: string
}

export const Button = forwardRef<HTMLButtonElement, Props>(({title,...rest}: Props, ref) => {
    return(
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">{title}</button>
    )
    }
)

