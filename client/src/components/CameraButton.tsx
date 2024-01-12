import { Tooltip } from 'antd'
import { useContext, } from 'react'
import { BsCameraVideoFill, BsFillCameraVideoOffFill } from 'react-icons/bs'
import { RoomContext } from '../contexts/RoomContext';


interface CameraButtonProps {
  toggleCamera: () => void;
}
const CameraButton: React.FC<CameraButtonProps> = ({toggleCamera}) => {
  const {isCameraOn} = useContext(RoomContext)

  return (
    <Tooltip placement='top' title={!isCameraOn? "Open your camera" : "Close your camera"}>
    <div onClick={toggleCamera} className={`rounded-full h-12 w-12 
  flex flex-row items-center justify-center text-xl cursor-pointer ${!isCameraOn ? "bg-slate-800" : "bg-blue-700" }`}>{!isCameraOn ? <BsFillCameraVideoOffFill/> : <BsCameraVideoFill/>}</div>
    </Tooltip>
  )
}

export default CameraButton
