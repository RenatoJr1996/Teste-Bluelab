import { useContext, useEffect, useState } from "react";
import { ChatContext } from "@/contexts/context";
import { MessageArea } from "./MessageAre";
import { LisOfUserConnected } from "./ListOfUsersConnected";



export interface IUser{
	userID: string
	user: string
}


export function Chat() {
	const {userID, nome, socket, setMessageList } = useContext(ChatContext)
	const [selectedUser, setSeletectedUser] = useState<IUser>();
	
	useEffect(() => {
		const sessionID = localStorage.getItem("sessionID");

		socket.auth = {sessionID: sessionID, nome: nome, userID: userID  };

		socket.connect();

		socket.on('session', ({sessionID}) => {
			localStorage.setItem("sessionID", sessionID)
		})

		socket.on("sendMessage", (message) => {
			setMessageList(list => [...list, message])
		})

		return () => {
			socket.off("userGet");
			socket.off("user");	
			socket.off("session");
			socket.off("sendMessage")	
		}
		  
	}, [])


	return (	
			<div>
				<div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-200 text-gray-800 p-10">
					 
					<LisOfUserConnected   setSeletectedUser={setSeletectedUser} />

					<div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
						<h2 className="bg-green-600 text-center font-bold">{selectedUser?.user}</h2>

						<MessageArea selectedUser={selectedUser} messageName={selectedUser?.user} />

					</div>
				</div>
			</div>
	
		
	)
}


