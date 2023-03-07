import { useContext, useEffect, useState } from "react";
import { ChatContext } from "@/contexts/context";
import { io } from "socket.io-client";
import { Form } from "@/components/UseFul/Form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { UsersAvatar } from "./UsersAvatar";
import { MessageArea } from "./MessageAre";


const ChatSchema = z.object({
	message: z.string()
})

type ChatData = z.infer<typeof ChatSchema>

export interface IMessage {
	to: IUser | undefined
	userID: string;
    nome: string,
    message: string,
    time: String
  }
export interface IUser{
	userID: string
	user: string
}

const socket = io("http://localhost:3333", { autoConnect: false });

export function Chat() {
	const {userID, nome} = useContext(ChatContext)
	const [selectedUser, setSeletectedUser] = useState<IUser>();
	const [userConnected, setUsersConected] = useState<IUser[]>([]);
	const [messageList, setMessageList] = useState<IMessage[]>([]);
	const { register, handleSubmit } = useForm();
	console.log(messageList);

	useEffect(() => {
		const sessionID = localStorage.getItem("sessionID");

		socket.auth = {sessionID: sessionID, nome: nome, userID: userID  };

		socket.connect();

		socket.emit("getUser");

		socket.on("userGet", (users) => {
			setUsersConected(users); 
			
		  });

		  socket.on("users", (users) =>{
			setUsersConected(users);
		});
		

		socket.on('session', ({sessionID}) => {
			localStorage.setItem("sessionID", sessionID)
		})

		socket.on("sendMessage", (message) => {
			setMessageList(list => [...list, message])
		})

		socket.on("getMessages", (messages) => {
			messages.map((message: IMessage) => {
				return(
					setMessageList(list => [...list, message])
					
				)
			})
			
		
		})

		return () => {
			socket.off("userGet");
			socket.off("user");	
			socket.off("session");
			socket.off("sendMessage")	
		}
		  
	}, [])


	const mySelf = (id: string) => {
        if (userID === id) {
            return false
        }
        return true
    }



	const sendMessage =  (data: any) => {
		const message : IMessage = {
			nome,
			userID,
			to: selectedUser,
			message: data.message,
			time: new Date().getHours() + ":" + new Date().getMinutes()
		}

		if(!selectedUser){
			return alert("Por favor selecione alguem para conversar!")
		}	
		socket.emit("sendMessage", message);
		setMessageList(list => [...list, message])

	}





	return (
		<Form onSubmit={handleSubmit(sendMessage)}>
			<div>
				<div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-200 text-gray-800 p-10">
					<div className="flex flex-row  w-full max-w-xl overflow-auto scroll">

						{
							userConnected.map((user, index) => {
								return (
									<div onClick={() => setSeletectedUser(user) } key={index}>
										{mySelf(user.userID) ? <UsersAvatar user={user.user} /> : <div></div>}
									</div>
								)
							})
						}

					</div>
					<div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
						<h2 className="bg-green-600 text-center font-bold">{selectedUser?.user}</h2>

						<MessageArea messageName={selectedUser?.user} messageList={messageList} />
						
						<div className="bg-gray-300 p-4">
							<input
								 {...register("message")}
								className="flex items-center h-10 w-full rounded px-3 text-sm"
								type="text"
								placeholder="Type your message…"
							/>
							<button type="submit" >PING</button>
						</div>

					</div>
				</div>
			</div>
	</Form>
		
	)
}


