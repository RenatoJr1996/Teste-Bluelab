import { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { ChatContext } from "@/contexts/context";


interface Props {
	socket: Socket;
	name: string;
	room: string;

}


const socket = io("http://localhost:3333");

export function Chat() {
	const { room, nome, messageList} = useContext(ChatContext)

	const [message, setMessage] = useState('');
	

	const sendMessage = async () => {
		if (message !== '') {
			const newMessage = {
				room: room,
				name: nome,
				message: message,
				time: new Date().getHours() + ":" + new Date().getMinutes()
			};

			socket.emit("sendMessage", newMessage);
			setMessage('')
		}
	}

	return (

		<div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
			<div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
			<h2>{nome}</h2>
				<ScrollToBottom className="flex flex-col flex-grow h-0 p-4 overflow-auto">

					{messageList.map((messageContent, index) => {
						return (
							<div key={index} >
								{nome === messageContent.name 
								?
									<div className="flex p-2 w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
										<div>
											<div className="bg-blue-600 text-white p-3 rounded-r-lg rounded-bl-lg">
												<p className="text-sm">{messageContent.message}</p>
											</div>
											<span className="text-xs text-gray-500 leading-none">{messageContent.name}</span>
											<span className="text-xs text-gray-500 ml-1 leading-none">{messageContent.time}</span>
										</div>
									</div>
									:
									<div className="flex w-full mt-2 space-x-3 max-w-xs">
										<div>
											<div className="bg-gray-300  p-3 rounded-l-lg rounded-br-lg">
												<p className="text-sm">{messageContent.message}</p>
											</div>
											<span className="text-xs text-gray-500 leading-none">{messageContent.name}</span>
											<span className="text-xs text-gray-500 ml-1 leading-none">{messageContent.time}</span>
										</div>
									</div>
								}
							</div>
						)
					})}

				</ScrollToBottom>

				<div className="bg-gray-300 p-4">
					<input 
					value={message}
					className="flex items-center h-10 w-full rounded px-3 text-sm" 
					type="text" 
					placeholder="Type your message…" 
					onChange={({target}) => setMessage(target.value)}
					onKeyDown={(event) =>{
						event.key === "Enter" && sendMessage();
					}} />
				</div>
			</div>
		</div>
	)
}


