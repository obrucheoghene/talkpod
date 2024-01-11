import { Tooltip } from 'antd'
import { useContext, } from 'react'
import { BsFillChatSquareTextFill } from 'react-icons/bs'
import { RoomContext } from '../contexts/RoomContext'

const MessageButton = () => {
  const {showChat, setShowChat} = useContext(RoomContext)

    const toggle = () => {
      setShowChat((prev) => !prev)
    }
  return (
    <Tooltip placement='top' title={showChat? "Show participants" : "Hide participants"}>
    <div onClick={toggle} className={`rounded-full h-12 w-12 
  flex flex-row items-center justify-center text-xl cursor-pointer ${!showChat ? "bg-slate-800" : "bg-blue-700" }`}> <BsFillChatSquareTextFill/> </div>
    </Tooltip>
  )
}

export default MessageButton
