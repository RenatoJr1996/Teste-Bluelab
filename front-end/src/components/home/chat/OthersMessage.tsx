
interface Props{
    messageContent: string;
    name: string;
    time: String;
}


export function OthersMessage({name, time, messageContent}: Props) {
    return(
    <div className="flex w-full mt-2 space-x-3 max-w-xs">
        <div>
            <div className="bg-gray-300  p-3 rounded-l-lg rounded-br-lg">
                <p className="text-sm">{messageContent}</p>
            </div>
            <span className="text-xs text-gray-500 leading-none">{name}</span>
            <span className="text-xs text-gray-500 ml-1 leading-none">{time}</span>
        </div>
    </div>
    )
}