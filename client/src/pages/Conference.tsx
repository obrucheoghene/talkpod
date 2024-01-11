import { useState } from 'react'
import ActivityBoard from '../components/ActivityBoard'
import ChatPanel from '../components/ChatPanel'
import ControlPanel from '../components/ControlPanel'
import ParticipantPanel from '../components/ParticipantPanel'
// import ParticipantPanel from '../components/ParticipantPanel'
// import ChatPanel from '../components/ChatPanel'
// import ActivityBoard from '../components/ActivityBoard'

const Conference = () => {
  const { ws, isCameraOn, userPeer, isMicOn, setIsMicOn, setIsCameraOn, isScreenShareOn, setIsScreenShareOn } = useContext(RoomContext);
  // const { user } = useContext(AuthContext);
  const [room, setRoom] = useState<RoomValue>()
  const navigate = useNavigate()

  const device = useRef<mediasoupTypes.Device>();
  const sendTransport = useRef<mediasoupTypes.Transport>();
  const recvTransports = useRef<Map<string, mediasoupTypes.Transport>>(new Map());
  const consumers = useRef<Map<string, mediasoupTypes.Consumer>>(new Map());
  const producers = useRef<Map<string, mediasoupTypes.Producer>>(new Map());
  const { roomId } = useParams()
  const producerSourceIds = useRef<Map<string, string>>(new Map())
  const [isReady, setIsReady] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className='bg-neutral-900 h-screen flex  py-2  overflow-y-hidden'>
      <div className=" container mx-auto flex flex-col justify-between text-white  overflow-hidden">
        <div className=' text-center '>Room Name</div>
        <div className="flex-grow-1 flex flex-row overflow-hidden gap-x-4 my-2  ">
          <ParticipantPanel />

          <ActivityBoard />

          <ChatPanel />

        </div>

        <ControlPanel />
      </div>
    </div>
  )
}

export default Conference
