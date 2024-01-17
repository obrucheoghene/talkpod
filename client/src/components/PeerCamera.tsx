import { useContext, useEffect, useRef, useState } from 'react'

import { Peer } from '../utils/types';
import { Avatar,  } from 'antd';
import { getInitials } from '../utils/helpers';
import { RoomContext } from '../contexts/RoomContext';
import { BsMicFill, BsMicMuteFill } from 'react-icons/bs';
import hark from 'hark'

interface PeerCameraProps {
  peer: Peer,
  size?: string,
}
const PeerCamera: React.FC<PeerCameraProps> = ({ peer, size }) => {
  const { userPeer } = useContext(RoomContext);
  const [shouldPulse, setShouldPulse] = useState(false);
  const delayTimeout = useRef<number | NodeJS.Timeout | undefined>(); // Variable to hold the timeout ID

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
    height: size,
  }


  useEffect(() => {
    if (peer.mic) {

      const options = {};
      const speechEvents = hark(peer.mic, options)

      speechEvents.on('volume_change', (dBLevel) => {
        // Update state with audio level changes
        // setAudioLevel(dBLevel);
        // implement pulsing 
        // Check if the audio level is below -50dB and start delay before stopping animation
        if (dBLevel < -50) {
          if (shouldPulse) {
            delayTimeout.current = setTimeout(() => {
              setShouldPulse(false);
            }, 1000)
          }
        } else {
          if (!shouldPulse) {
            setShouldPulse(true);
            if (delayTimeout.current) {
              clearInterval(delayTimeout.current)
              delayTimeout.current = undefined;
            }
          }
        }

      });

      return () => {
        // Stop monitoring when component unmounts
        speechEvents.stop();
        clearTimeout(delayTimeout.current);
      };
    } else {
      setShouldPulse(false);
      clearInterval(delayTimeout.current)
    }
  }, [peer.mic, shouldPulse])


  return (
    <div className='peerContainer' style={{ ...updateContainerStyle }}>
      {<audio ref={audioRef} muted={userPeer?.id === peer.id} />}
      {
        peer.video ?
          <video className='cameraVideo' ref={videoRef}  />
          : <Avatar size={100} style={{
            animation: shouldPulse ? `audioLightPulse 1.5s infinite` : 'none'
          }} 
          > {getInitials(peer.name)}</Avatar>
      }
      <div className='userStatusContainer'>
      {peer.mic ? <BsMicFill/> : <BsMicMuteFill/>}
        <span className='username'>{`${peer.name}`}</span>
        <span className='you'>{userPeer?.id === peer.id ? '(You)' : ''}</span>
      </div>
    </div>
  );
}

export default PeerCamera;
