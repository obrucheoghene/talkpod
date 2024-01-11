import { Tooltip } from 'antd'
import { MdCallEnd } from 'react-icons/md';

interface EndCallButtonProps {
  handleEnd: () => void
}
const EndCallButton: React.FC<EndCallButtonProps> = ({handleEnd}) => {

  return (
    <Tooltip placement='top' title={"Leave meeting"}>
    <div onClick={handleEnd} className={`rounded-full h-12 w-12 
  flex flex-row items-center justify-center text-xl cursor-pointer bg-red-700`}> <MdCallEnd/></div>
    </Tooltip>
  )
}

export default EndCallButton
