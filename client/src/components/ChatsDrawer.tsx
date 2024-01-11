import {Drawer, Input, Card } from 'antd'
import { Chat } from '../utils/types'
import { useContext, useEffect, useState } from 'react'
import { SOCKET_EVENT_TYPES as SE } from '../utils/constants'
import { RoomContext } from '../context/RoomContext'
import { useAppDispatch } from '../hooks/redux'
import { addChat } from '../reducers/chatSlice'

interface ChatsDrawerProps {
  open: boolean,
  onClose: () => void,
  chats: Chat[]
}

const ChatsDrawer:React.FC<ChatsDrawerProps> = ({open, onClose, chats}) => {
  const { ws, userPeer  } = useContext(RoomContext);
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch()


  useEffect(() => {

    ws.on('message', ({ eventType, data }) => {
      switch (eventType) {
        case SE.newPublicChat:
          newPublicChat(data);
          break;
        default:
          break;
      }
    })

    return () => {
      ws.off('message');
    }

  }, [])

  const newPublicChat = (data: Record<string, any>) => {
    dispatch(addChat(data.chat))
  }

  const sendMessage = async () => {
    if (!userPeer) return
    const  data = {
      peerId: userPeer.id,
      peerName: userPeer.name,
      message, 
    }
    ws.emit('message', {
      eventType: SE.sendPublicChat,
      data
    }, () => {
    })
    dispatch(addChat(data))
    setMessage('')
  }

    
  const handleMessageChange = (message: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(message.target.value);
  }
  return (
    <Drawer title={'Public Chats'} open={open} onClose={onClose} placement='right'>
    <div className=' flex flex-col justify-between h-full'>
      {chats.length === 0 && <div className=' flex-grow flex flex-col justify-center  overflow-y-auto mb-5'>
         <p className=' justify-items-center mx-auto'>Send the first message</p>
      </div>}
      {chats.length > 0 && <div className=' flex-grow flex flex-col  overflow-y-auto mb-5'>
        {
          chats.map((chat, i) =>   <Card key={i} size='small' title={chat.peerName} bordered={false}  >
          <p>{chat.message}</p>

        </Card>)
        }
      </div>}

    <div>
    <Input.TextArea placeholder='Chat here' value={message} onChange={handleMessageChange}/>
    <div className='flex justify-end mt-2'>
    <button onClick={sendMessage} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'>Send</button>

    </div>
    </div>
    </div>

    </Drawer>
  )
}

export default ChatsDrawer
