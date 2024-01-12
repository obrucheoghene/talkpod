import { Tooltip } from 'antd'
import { useContext } from 'react'
import { BsMicFill, BsMicMuteFill } from 'react-icons/bs'
import { RoomContext } from '../contexts/RoomContext';

interface MicButtonProps {
  toggleMic: () => void;
}
const MicButton: React.FC<MicButtonProps> = ({toggleMic}) => {
  const {isMicOn} = useContext(RoomContext)
  return (
    <Tooltip placement='top' title={!isMicOn? "Unmute" : "Mute"}>
    <div onClick={toggleMic} className={`rounded-full h-12 w-12 
  flex flex-row items-center justify-center text-xl cursor-pointer ${!isMicOn ? "bg-slate-800" : "bg-blue-700" }`}>{!isMicOn ? <BsMicMuteFill/> : <BsMicFill/>}</div>
    </Tooltip>
  )
}

export default MicButton
