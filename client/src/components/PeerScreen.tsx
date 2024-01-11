import { useEffect, useRef } from 'react'

import { Peer } from '../utils/types';
import { Avatar, Badge, Card } from 'antd';
import { getInitials } from '../utils/helpers';

interface PeerScreenProps {
  peer: Peer,
}
const PeerScreen: React.FC<PeerScreenProps> = ({ peer }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {

    if (videoRef.current && peer.screen) {
      videoRef.current.srcObject = peer.screen
      videoRef.current.play()
    }

  }, [peer.screen])

  if (!peer.screen) {
    return (
      <Card className='bg-neutral-900 border-none text-white'>

        <div className='flex justify-center h-24 items-center'>
          <Avatar size={64}>{getInitials(peer.name)}</Avatar>
        </div>
        <p className=' text-center'>{peer.name}</p>
      </Card>
    )
  }
  return (
    <Badge.Ribbon text={`${peer.name} is presenting`}>
    <Card  className='bg-neutral-900 border-none text-white'>

    <div className='flex justify-center items-center'>
    <video className='h-full mx-auto w-auto' ref={videoRef} />

    </div>
  </Card>
  </Badge.Ribbon>

  )
}

export default PeerScreen;
