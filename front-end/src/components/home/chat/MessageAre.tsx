import { Form } from "@/components/UseFul/Form"
import { ChatContext, IMessage } from "@/contexts/context"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import ScrollToBottom from "react-scroll-to-bottom"
import { z } from "zod"
import { IUser } from "./Chat"
import { MyMessage } from "./MyMessage"
import { OthersMessage } from "./OthersMessage"

interface Props {
    messageName: string | undefined
    selectedUser: IUser | undefined
}

const ChatSchema = z.object({
	message: z.string()
    // .min(1, {message: "digite uma mensagem"})
})

type ChatData = z.infer<typeof ChatSchema>


export function MessageArea({ messageName, selectedUser }: Props) {
    const {userID, nome, messageList, setMessageList, socket } = useContext(ChatContext);
    const { register, handleSubmit, formState: { errors } } = useForm<ChatData>({ resolver: zodResolver(ChatSchema)});
    const [inputValue, setInputValue] = useState('');

    const sendMessage =  () => {
		const message : IMessage = {
			nome,
			userID,
			toUserID: selectedUser?.userID,
			toUser: selectedUser?.user,
			message: inputValue,
			time: new Date().getHours() + ":" + new Date().getMinutes()
		}

		if(!selectedUser){
			return alert("Por favor selecione alguem para conversar!")
		}	
		socket.emit("sendMessage", message);
		setMessageList(list => [...list, message])
        setInputValue('')
	}

    useEffect(() => {
      socket.emit("messagesGet")

      socket.on("getMessages", (messages) => {
        messages.map((message: IMessage) => {
            setMessageList(list => [...list, message])
        })
      })
    
      return () => {
        socket.off("messagesGet")
        socket.off("getMessages")
      }
    }, [])
    

    return (
        <>
        <ScrollToBottom className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {messageList.map((messageContent, index) => {
                return (
                    <div key={index} >
                    {
                        nome === messageContent.nome && messageName === messageContent.toUser
                        ?
                            <MyMessage messageContent={messageContent.message} name={messageContent.nome} time={messageContent.time} />
                        :
                            <div>       
                                 {
                                        nome === messageContent.toUser && messageName === messageContent.nome
                                    ?
                                        <OthersMessage messageContent={messageContent.message} name={messageContent.nome} time={messageContent.time} />
                                    :
                                        <div></div>
                                }
                            </div>
                    }
                    </div>
                )
            })}
        </ScrollToBottom>

        <Form onSubmit={handleSubmit(sendMessage)}>
            <div className="bg-gray-300 p-4">
                <input
                    {...register("message")}
                    className="flex items-center h-10 w-full rounded px-3 text-sm"
                    type="text"
                    placeholder="Type your message…"
                    onChange={({target}) => {setInputValue(target.value)}}
                    value = {inputValue}
                    
                />
                <span className="text-red-400">{errors.message?.message}</span>
            </div>
        </Form>
        
        </>

    )
}



