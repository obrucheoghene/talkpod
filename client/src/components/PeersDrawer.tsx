import {Drawer, List} from 'antd'
import { Peer } from '../utils/types'

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
      renderItem={(peer) => <List.Item>{peer.name}</List.Item>}
    />

    </Drawer>
  )
}

export default PeersDrawer
