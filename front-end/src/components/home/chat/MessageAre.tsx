import { ChatContext } from "@/contexts/context"
import { useContext } from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import { IMessage } from "./Chat"
import { MyMessage } from "./Myessage"
import { OthersMessage } from "./OthersMessage"

interface Props {
    messageList: IMessage[]
    messageName: string | undefined
}


export function MessageArea({ messageList, messageName }: Props) {

    const { nome } = useContext(ChatContext)

    return (
        <ScrollToBottom className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {messageList.map((messageContent, index) => {
                return (
                    <div key={index} >
                        {
                            nome === messageContent.nome && messageName === messageContent.to?.user
                                ?
                                <MyMessage messageContent={messageContent.message} name={messageContent.nome} time={messageContent.time} />
                                :
                                <div>                       {
                                    nome === messageContent.to?.user && messageName === messageContent.nome
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
    )
}