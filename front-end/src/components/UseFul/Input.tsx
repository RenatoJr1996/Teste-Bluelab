import {  forwardRef, InputHTMLAttributes } from "react";


interface Props extends InputHTMLAttributes<HTMLInputElement> {
    title: string
    errorMessage?: string
}

export const  Input = forwardRef<HTMLInputElement, Props> (({title, errorMessage, ...rest  }: Props, ref) => {
    return(
   <>
    <div  className="flex text-red-300">{errorMessage}</div>
    <div className="mb-6 pt-3 rounded bg-gray-200">
        <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor={title}>{title}</label>
        <input ref={ref} {...rest} id={title} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-green-600 transition duration-500 px-3 pb-3"/>
    </div>
   </>
    )
}
)
