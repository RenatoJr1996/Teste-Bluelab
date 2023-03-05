import { useContext, useEffect, useState } from "react";
import { ChatContext, IMessage } from "@/contexts/context";
import { MessageArea } from "./MessageAre";
import { io } from "socket.io-client";
import { Form } from "@/components/UseFul/Form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { UsersAvatar } from "./UsersAvatar";


const ChatSchema = z.object({
	message: z.string()
})

type ChatData = z.infer<typeof ChatSchema>

export interface IUSer{
	userID: string
	user: string
}


export function Chat() {
	const {userID, nome} = useContext(ChatContext)
	const [selectedUser, setSeletectedUser] = useState<IUSer>();
	const [userConnected, setUsersConected] = useState<IUSer[]>([]);
	const { register, handleSubmit } = useForm();

	const socket = io("http://localhost:3333", { autoConnect: false });

// start connection and list the users
	useEffect(() => {
		const sessionID = localStorage.getItem("sessionID");

		socket.auth = {sessionID: sessionID, nome: nome, userID: userID  };

		socket.connect();

		socket.emit("getUser");

		socket.on("userGet", (users) => {
			setUsersConected(users);  
		  });

		return () => {
			socket.off("userGet");	
		}
		  
	}, [])


// update list of online users		
	useEffect(() => {
		socket.on("users", (users) =>{
			setUsersConected(users);
		});
		

		socket.on('session', ({sessionID}) => {
			localStorage.setItem("sessionID", sessionID)
		})

		return () => {
			socket.off("user");	
			socket.off("session");	
		}
	},[socket])

	const mySelf = (id: string) => {
        if (userID === id) {
            return false
        }
        return true
    }



	const sendMessage =  (data: any) => {

		const message = {
			nome,
			userID,
			name: selectedUser,
			message: data.message,
			time: new Date().getHours() + ":" + new Date().getMinutes()
		}

		socket.emit("sendMessage", message)	
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

						<MessageArea />
						
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


