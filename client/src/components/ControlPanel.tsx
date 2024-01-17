import CameraButton from './CameraButton'
import EndCallButton from './EndCallButton'
import MessageButton from './MessageButton'
import MicButton from './MicButton'
import ParticipantButton from './ParticipantButton'
import ScreenShareButton from './ScreenShareButton'

interface ControlPanelProps {
  toggleMic: () => void;
  toggleCamera: () => void;
  toggleScreen: () => void;
  endCall: () => void;
}
const ControlPanel: React.FC<ControlPanelProps> = ({toggleCamera, toggleMic, toggleScreen, endCall}) => {
  return (

      <div className=" flex flex-row justify-between ">
        <ParticipantButton />

        <div className=' flex flex-row items-center justify-between gap-x-5'>
          <MicButton toggleMic={toggleMic}/>
          {/* <CameraButton toggleCamera={toggleCamera}/>
          <ScreenShareButton toggleScreen={toggleScreen}/> */}
          <EndCallButton handleEnd={endCall}/>
        </div>

        <MessageButton />
      </div>
  )
}

export default ControlPanel
