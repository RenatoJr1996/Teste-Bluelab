import {  forwardRef, InputHTMLAttributes } from "react";


interface Props extends InputHTMLAttributes<HTMLInputElement> {
    title: string
    errorMessage?: string
}

export const  Input = forwardRef<HTMLInputElement, Props> (({title, errorMessage, ...rest  }: Props, ref) => {
    return(
   <>
   <div  className="flex text-red-300">
        {errorMessage}
        { errorMessage && 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
 }
   </div>
    <div className="mb-6 pt-3 rounded bg-gray-200">
        <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor={title}>{title}</label>
        <input ref={ref} {...rest} id={title} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-green-600 transition duration-500 px-3 pb-3"/>
    </div>
    
   </>
    )
}
)
