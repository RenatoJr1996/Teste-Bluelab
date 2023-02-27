import { ReactNode } from "react"

interface IChat{
    children: ReactNode;
    name: string;
}



export function FormChat({children, name}: IChat){
    return(
        <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-200 text-gray-800 p-10">
            <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
                <h2 className="bg-green-600 text-center  font-bold">{name}</h2>
                {children}
        </div>
    </div>
    )
}