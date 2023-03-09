import { ChatContext } from "@/contexts/context"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { IUser } from "./Chat"
import { UsersAvatar } from "./UsersAvatar"


interface Props {
    setSeletectedUser: Dispatch<SetStateAction<IUser | undefined>>
}

export function LisOfUserConnected({setSeletectedUser}: Props) {
    const {userID, socket} = useContext(ChatContext)
    const [userConnected, setUsersConected] = useState<IUser[]>([]);
    const [newMessage, setNewMessage] = useState(false);

    useEffect(() => {
        socket.emit("getUser");

		socket.on("userGet", (users) => {;
			setUsersConected(users); 
		  });

		  socket.on("users", (users) =>{
			setUsersConected(users);
		});
		
    
      return () => {
        socket.off("getUser")
        socket.off("userGetg")
        socket.off("users")
      }
    }, [])
    


    const mySelf = (id: string) => {
        if (userID === id) { return false}

        return true
    }


    return(
        <div className="flex flex-row  w-full max-w-xl overflow-auto scroll">

            {
                userConnected.map((user, index) => {
                    return (
                        <div onClick={() => {setSeletectedUser(user)}  } key={index}>
                            {mySelf(user.userID) ? <UsersAvatar setNewMessage={setNewMessage} newMessage={newMessage} user={user.user} /> : <div></div>}
                        </div>
                    )
                })
            }
            
		</div>
    )
}