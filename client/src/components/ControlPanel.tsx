import CameraButton from './CameraButton'
import EndCallButton from './EndCallButton'
import MessageButton from './MessageButton'
import MicButton from './MicButton'
import ParticipantButton from './ParticipantButton'
import ScreenShareButton from './ScreenShareButton'

const ControlPanel = () => {
  return (

      <div className=" flex flex-row justify-between ">
        <ParticipantButton />

        <div className=' flex flex-row items-center justify-between gap-x-5'>
          <MicButton />
          <CameraButton />
          <ScreenShareButton />
          <EndCallButton />
        </div>

        <MessageButton />
      </div>
  )
}

export default ControlPanel
