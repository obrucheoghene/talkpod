import { Card, } from 'antd'
import { twMerge } from 'tailwind-merge';
import { useAppSelector } from '../hooks/redux';
import PeerCamera from './PeerCamera';


const ActivityBoard = () => {

  const peers = useAppSelector((state) => state.peers)


    const peersList = Object.values(peers);
    const getGridClass = (count: number) => {
        if (count <= 2) {
          return 'grid-cols-1 grid-rows-1';
        } else if (count <= 4) {
          return 'grid-cols-2 grid-rows-2';
        } else if (count <= 9) {
          return 'grid-cols-3 grid-rows-3';
        } else if (count <= 16) {
          return 'grid-cols-4 grid-rows-4';
        } else {
          // Add more cases as needed for larger grids
          return 'grid-cols-4 grid-rows-4'; // Default to 4x4 for more than 16 participants
        }
      };
    
    // const responsiveGridClass = "grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-3 xl:grid-cols-4 xl:grid-rows-4";
    const gridClass = getGridClass(peersList.length);

    return (
        <Card size="small" className='flex-grow-1 flex  flex-col bg-transparent border-none text-white overflow-hidden'>
            <div className={twMerge(`grid ${gridClass} gap-2 max-h-full w`)}>
                {peersList.map((peer) => (
                    <PeerCamera key={peer.id} peer={peer}/>
                ))}
            </div>
        </Card>
    )
}

export default ActivityBoard
