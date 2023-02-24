
interface Props{
    messageContent: string;
    name: string;
    time: String;
}


export function MyMessage({name, time, messageContent}: Props) {
    return(
        <div className="flex p-2 w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
                <div className="bg-blue-600 text-white p-3 rounded-r-lg rounded-bl-lg">
                    <p className="text-sm">{messageContent}</p>
                </div>
                <span className="text-xs text-gray-500 leading-none">{name}</span>
                <span className="text-xs text-gray-500 ml-1 leading-none">{time}</span>
            </div>
    </div>
    )
}