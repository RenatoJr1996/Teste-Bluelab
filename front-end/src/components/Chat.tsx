import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface Props {
    socket: Socket;
    name: string;
    room: string;

}

interface IMessage{
    room: string,
    name:string,
    message: string,
    time: String
}


export function Chat({socket, name, room}: Props) {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState<IMessage[]>([]);

    useEffect(() => {
        socket.on("reSendMessage", (reSendMessage) =>{
            setMessageList((list) => [...list, reSendMessage]);
        })
    },[socket]);

    const sendMessage = async() => {
        if(message !== ''){
            const newMessage = {
                room: room,
                name:name,
                message: message,
                time: new Date().getHours() + ":" + new Date().getMinutes()
            };

            await socket.emit("sendMessage", newMessage)
            setMessageList((list) => [...list, newMessage]);
        }
    }

    return (
        <div>
            <div> 
                <p>live Chat</p>
            </div>   

            <div>

                {messageList.map((message, index) =>{
                    return <p key={index}>{message.message}</p>
                })}
            </div>  

            <div>
                <input type="text" name="message" id="message" placeholder="Message..." onChange={({target}) => {setMessage(target.value)}} />
                <button onClick={sendMessage} > {">"} </button>
            </div>


        </div>
    )
}