import { useContext, useEffect, useRef } from 'react'

import { Peer } from '../utils/types';
import { Avatar,  } from 'antd';
import { getInitials } from '../utils/helpers';
import { RoomContext } from '../contexts/RoomContext';
interface PeerCameraProps {
  peer: Peer,
  size?: string,

}
const PeerCamera: React.FC<PeerCameraProps> = ({ peer, size }) => {
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
      <div style={{ height: size}} className={`bg-neutral-800 w-full aspect-video border flex justify-center items-center rounded-lg text-white ${peer.mic ? 'border-blue-500' : 'border-neutral-800'}`}>
        {<audio ref={audioRef} muted={userPeer?.id === peer.id} />}
        <div className='flex justify-center h-24 items-center'>
          <Avatar size={100}>{getInitials(peer.name)}</Avatar>
        </div>
        <p className=' text-center'>{peer.name}</p>
      </div>
    )
  }
  return (
    <div style={{ height: size}} className={`bg-neutral-800 w-full aspect-video border flex justify-center items-center rounded-lg text-white ${peer.mic ? 'border-blue-500' : 'border-neutral-800'}`}>
    {peer.mic && <audio ref={audioRef} muted={userPeer?.id === peer.id} />}

      {/* <div className='flex justify-center   items-center'> */}
        <video className='aspect-video mx-auto w-auto' ref={videoRef} />
      {/* </div> */}
      {/* <p className=' text-center'>{peer.name}</p> */}
    </div>

  )
}

export default PeerCamera;
