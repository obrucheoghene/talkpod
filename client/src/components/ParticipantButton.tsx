import { Tooltip } from 'antd'
import { useContext } from 'react'
import { FaUsers } from 'react-icons/fa'
import { RoomContext } from '../contexts/RoomContext'

const ParticipantButton = () => {
  const {showParticipant, setShowParticipant} = useContext(RoomContext)
    const toggle = () => {
      setShowParticipant((prev) => !prev)
    }
  return (
    <Tooltip placement='top' title={showParticipant? "Show participants" : "Hide participants"}>
    <div onClick={toggle} className={`rounded-full h-12 w-12 
  flex flex-row items-center justify-center text-xl cursor-pointer ${!showParticipant ? "bg-slate-800" : "bg-blue-700" }`}> <FaUsers/> </div>
    </Tooltip>
  )
}

export default ParticipantButton
