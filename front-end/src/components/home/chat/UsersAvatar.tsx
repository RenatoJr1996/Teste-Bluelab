import { useState } from "react"

interface Props {
    user: string
}


export function UsersAvatar({ user }:Props) {


    return(
        <div className="flex flex-col pb-4 px-2 " >
        <div className="">
            <img
                src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                className="object-cover h-12 w-12 rounded-full"
                alt=""
            />
        </div>

            <div className="w-full">
                <div className=" text-lg font-semibold">{user}</div>
            </div>

    </div>
    )
}