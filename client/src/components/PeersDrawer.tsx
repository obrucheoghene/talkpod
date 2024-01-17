import {Drawer, List} from 'antd'
import { Peer } from '../utils/types'
import { BsMicFill, BsMicMuteFill } from 'react-icons/bs'

interface PeersDrawerProps {
  open: boolean,
  onClose: () => void,
  peers: Peer[]
}

const PeersDrawer:React.FC<PeersDrawerProps> = ({open, onClose, peers}) => {
  return (
    <Drawer title={'Peers'} open={open} onClose={onClose} placement='left'>
    <List
      size="small"
      bordered
      dataSource={peers}
      renderItem={(peer) => <List.Item className=' flex flex-row '><span className=' inline-flex'>{peer.mic ? <BsMicFill className=' text-blue-700'/> : <BsMicMuteFill/>}</span> <span>{peer.name}</span></List.Item>}
    />

    </Drawer>
  )
}

export default PeersDrawer
