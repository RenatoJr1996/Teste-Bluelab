import { useContext, useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { ChatContext } from "@/contexts/context";
import { FormChat } from "./FormChat";
import { MessageArea } from "./MessageAre";


export function Chat() {
	const {socket, room, nome, messageList } = useContext(ChatContext)
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
		<FormChat name= {nome}>
			<MessageArea/>


<div className="bg-gray-300 p-4">
<input
	value={message}
	className="flex items-center h-10 w-full rounded px-3 text-sm"
	type="text"
	placeholder="Type your message…"
	onChange={({ target }) => setMessage(target.value)}
	onKeyDown={(event) => {
		event.key === "Enter" && sendMessage();
	}} />
</div>
		</FormChat>
	)
}


