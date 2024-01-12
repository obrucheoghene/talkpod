import { Tooltip } from 'antd'
import { useContext } from 'react'
import { MdScreenShare, MdStopScreenShare } from 'react-icons/md'
import { RoomContext } from '../contexts/RoomContext';


interface ScreenButtonProps {
  toggleScreen: () => void;
}
const ScreenShareButton: React.FC<ScreenButtonProps> = ({toggleScreen}) => {
  const {isScreenShareOn} = useContext(RoomContext)


  return (
    <Tooltip placement='top' title={!isScreenShareOn? "Share your screen" : "Stop sharing your screen"}>
    <div onClick={toggleScreen} className={`rounded-full h-12 w-12 
  flex flex-row items-center justify-center text-xl cursor-pointer ${!isScreenShareOn ? "bg-slate-800" : "bg-blue-700" }`}>{!isScreenShareOn ? <MdStopScreenShare/> : <MdScreenShare/> }</div>
    </Tooltip>
  )
}

export default ScreenShareButton
