import { useContext, useEffect, useRef } from 'react'

import { Peer } from '../utils/types';
import { Avatar, Card } from 'antd';
import { getInitials } from '../utils/helpers';
import { RoomContext } from '../context/RoomContext';
interface PeerCameraProps {
  peer: Peer,
}
const PeerCamera: React.FC<PeerCameraProps> = ({ peer }) => {
  const { userPeer } = useContext(RoomContext);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);




  useEffect(() => {

  
    if (videoRef.current && peer.video) {
      videoRef.current.srcObject = peer.video
      videoRef.current.play()
    }


  }, [peer.video])



  useEffect(() => {
    if (audioRef.current && peer.mic) {
      audioRef.current.srcObject = peer.mic
      audioRef.current.play()
    }
  }, [peer.mic])

  if (!peer.video) {
    return (
      <Card className={`bg-neutral-900 border  text-white ${peer.mic ? 'border-blue-500' : 'border-neutral-900'}`}>
        {<audio ref={audioRef} muted={userPeer?.id === peer.id} />}
        <div className='flex justify-center h-24 items-center'>
          <Avatar size={64}>{getInitials(peer.name)}</Avatar>
        </div>
        <p className=' text-center'>{peer.name}</p>
      </Card>
    )
  }
  return (
    <Card className={`bg-neutral-900 border  text-white ${peer.mic ? 'border-blue-500' : 'border-neutral-900'}`}>
      {peer.mic && <audio ref={audioRef} muted={userPeer?.id === peer.id} />}

      <div className='flex justify-center h-24 items-center'>
        <video className='h-full mx-auto w-auto' ref={videoRef} />
      </div>
      <p className=' text-center'>{peer.name}</p>
    </Card>

  )
}

export default PeerCamera;
