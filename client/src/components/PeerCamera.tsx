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


  const updateContainerStyle = {
    // maxHeight: peer.isVideoPinned ? '100%' : size,
    height: size,
    // maxHeight: size,
    // backgroundColor: bg,

  }

  return (
    <div className='peerContainer' style={{ ...updateContainerStyle }}>
      {<audio ref={audioRef} muted={userPeer?.id === peer.id} />}
      {
        peer.video ?
          <video className='cameraVideo' ref={videoRef}  />
          : <Avatar size={64}> {getInitials(peer.name)}</Avatar>
      }
      <div className='userStatusContainer'>
        <span className='username'>{`${peer.name}`}</span>
        <span className='you'>{userPeer?.id === peer.id ? '(You)' : ''}</span>
      </div>
    </div>
  );
}

export default PeerCamera;
