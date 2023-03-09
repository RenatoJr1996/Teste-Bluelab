import { Dispatch, SetStateAction, useState } from "react"

interface Props {
    user: string
    newMessage: boolean
    setNewMessage: Dispatch<SetStateAction<boolean>>
}


export function UsersAvatar({ user, newMessage, setNewMessage }:Props) {


    return(
        <div onClick={() => setNewMessage(false)} className="flex flex-col pb-4 px-2 " >
        <div className="">
        { newMessage 
        ?
            <div className=" animate-pulse z-10 relative float-right justify-start" > 
                <div  className="w-4 h-4 absolute top-0 right-7 rounded-full bg-red-600"></div>
            </div>
        :
        <div></div>   
        }
            <img
                src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                className="object-cover h-12 w-12 rounded-full"
                alt=""
            />
            
        </div>

            <div className=" w-full">
                <div className=" text-lg w-20 font-semibold">{user}</div>
            </div>

    </div>
    )
}