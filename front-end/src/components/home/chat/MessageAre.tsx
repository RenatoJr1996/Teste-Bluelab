import { ChatContext } from "@/contexts/context"
import { useContext } from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import { MyMessage } from "./Myessage"
import { OthersMessage } from "./OthersMessage"




export function MessageArea() {
    const {nome, messageList } = useContext(ChatContext)

    return(
        <ScrollToBottom className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {messageList.map((messageContent, index) => {
            return (
                <div key={index} >
                    {
                    nome === messageContent.name 
                    ?
                        <MyMessage messageContent={messageContent.message} name={messageContent.name} time={messageContent.time} /> 
                    :
                        <OthersMessage messageContent={messageContent.message} name={messageContent.name} time={messageContent.time} />
                    }
                </div>
            )
            })}
        </ScrollToBottom> 
    )
}