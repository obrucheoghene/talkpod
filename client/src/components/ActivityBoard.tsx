import { useAppSelector } from '../hooks/redux';
import PeerCamera from './PeerCamera';
import { getPeerBoxSize } from '../utils/helpers';


const ActivityBoard = () => {

  const peers = useAppSelector((state) => state.peers)


    const peersList = Object.values(peers);

    const size = getPeerBoxSize(peersList.length)
  

    return (
        <div  className='displayContainer'>
            {peersList.map((peer) => (
                    <PeerCamera key={peer.id} peer={peer} size={size}/>
              ))}
        </div>
    )
}

export default ActivityBoard
