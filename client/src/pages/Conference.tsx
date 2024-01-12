/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState } from 'react'
import ActivityBoard from '../components/ActivityBoard'
import ChatPanel from '../components/ChatPanel'
import ControlPanel from '../components/ControlPanel'
import ParticipantPanel from '../components/ParticipantPanel'
import { Device, types as mediasoupTypes  } from 'mediasoup-client'
import { useNavigate, useParams } from 'react-router-dom'
import { Peer, Room as RoomValue } from '../utils/types';
import { getRoomById } from '../utils/helpers'
import { RoomContext } from '../contexts/RoomContext'
import { SOCKET_EVENT_TYPES as SE } from '../utils/constants';
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { addPeer, removePeer, updatePeer } from '../reducers/peerSlice'

// import ParticipantPanel from '../components/ParticipantPanel'
// import ChatPanel from '../components/ChatPanel'
// import ActivityBoard from '../components/ActivityBoard'

const Conference = () => {
  const { ws, isCameraOn, userPeer, isMicOn, setIsMicOn, setIsCameraOn, isScreenShareOn, setIsScreenShareOn } = useContext(RoomContext);
  // // const { user } = useContext(AuthContext);
  const [room, setRoom] = useState<RoomValue>()
  const navigate = useNavigate()
  const { roomId } = useParams()
  const [isReady, setIsReady] = useState(false);


  const device = useRef<mediasoupTypes.Device>();
  const sendTransport = useRef<mediasoupTypes.Transport>();
  const recvTransports = useRef<Map<string, mediasoupTypes.Transport>>(new Map());
  const consumers = useRef<Map<string, mediasoupTypes.Consumer>>(new Map());
  const producers = useRef<Map<string, mediasoupTypes.Producer>>(new Map());
  const producerSourceIds = useRef<Map<string, string>>(new Map())
  const dispatch = useAppDispatch();
  const peers = useAppSelector((state) => state.peers)
  // const chats = useAppSelector((state) => state.chats)

  const toggleCamera = async () => {
    if (isCameraOn) {
      await offCamera()
    } else {
      await onCamera()
    }
    setIsCameraOn(!isCameraOn);
  }


  const onCamera = async () => {
    console.log('Oncamera')
    if (!userPeer) return

    try {
      const userStream = await navigator.mediaDevices.getUserMedia({ video: { width: { min: 1280 }, height: { min: 720 } } });

 
      if (!sendTransport.current) return;

      // const canvasStream = canvasRef.current.captureStream()
      dispatch(updatePeer({ ...peers[userPeer.id], video: userStream }))
      const producer = await sendTransport.current.produce({ track: userStream.getVideoTracks()[0], appData: { source: 'camera' } })
      producerSourceIds.current.set('camera', producer.id);
      producers.current.set(producer.id, producer);

      console.log('producers.current', producers.current)

    } catch (error) {
      console.log(error)
    }
  }

  const offCamera = async () => {
    console.log("OFF Camera")
    if (!userPeer) return

    peers[userPeer.id].video?.getTracks().forEach(track => {
      track.stop();
    })
    dispatch(updatePeer({ ...peers[userPeer.id], video: undefined }))
    // getProducer
    console.log('producers.current', producers.current)
    const producerId = producerSourceIds.current.get('camera');
    if (!producerId) return

    const producer = producers.current.get(producerId);
    if (!producer) {
      console.log("Producer was not found");
      return
    }
    producers.current.delete(producer.id);
    producer.close();
    await emitRequest(SE.producerClosed, { producerId: producer.id })

  }

  const toggleScreen = async () => {
    if (isScreenShareOn) {
      await stopScreenShare()
    } else {
      await startScreenShare()
    }
    setIsScreenShareOn(!isScreenShareOn);
  }


  const stopScreenShare = async () => {
    console.log("stopScreenShare")
    if (!userPeer) return

    peers[userPeer.id].screen?.getTracks().forEach(track => {
      track.stop();
    })
    dispatch(updatePeer({ ...peers[userPeer.id], screen: undefined }))
    // getProducer
    console.log('producers.current', producers.current)
    const producerId = producerSourceIds.current.get('screen');
    if (!producerId) return

    const producer = producers.current.get(producerId);
    if (!producer) {
      console.log("Producer was not found");
      return
    }
    producers.current.delete(producer.id);
    producer.close();
    await emitRequest(SE.producerClosed, { producerId: producer.id })
  }

  const startScreenShare = async () => {
    console.log('Start Screen Share')
    if (!userPeer) return

    try {
      const userStream = await navigator.mediaDevices.getDisplayMedia({ video: true });

      if (!sendTransport.current) return;

      dispatch(updatePeer({ ...peers[userPeer.id], screen: userStream }))

      const producer = await sendTransport.current.produce({ track: userStream.getVideoTracks()[0], appData: { source: 'screen' } })
      producerSourceIds.current.set('screen', producer.id);
      producers.current.set(producer.id, producer);

      console.log('producers.current', producers.current)

    } catch (error) {
      console.log(error)
    }
  }

  const toggleMic = async () => {
    if (isMicOn) {
      await muteMic()
    } else {
      await unMuteMic()
    }
    setIsMicOn(!isMicOn);
  }

  const unMuteMic = async () => {
    console.log('unMuteMic')
    if (!userPeer) return

    try {
      const userStream = await navigator.mediaDevices.getUserMedia({ audio: true });

      if (!sendTransport.current) return;

      dispatch(updatePeer({ ...peers[userPeer.id], mic: userStream }))

      const producer = await sendTransport.current.produce({ track: userStream.getAudioTracks()[0], appData: { source: 'mic' } })
      producerSourceIds.current.set('mic', producer.id);
      producers.current.set(producer.id, producer);

      console.log('producers.current', producers.current)

    } catch (error) {
      console.log(error)
    }
  }

  const muteMic = async () => {
    console.log("OFF Camera")
    if (!userPeer) return

    peers[userPeer.id].mic?.getTracks().forEach(track => {
      track.stop();
    })
    dispatch(updatePeer({ ...peers[userPeer.id], mic: undefined }))
    // getProducer
    console.log('producers.current', producers.current)
    const producerId = producerSourceIds.current.get('mic');
    if (!producerId) return

    const producer = producers.current.get(producerId);
    if (!producer) {
      console.log("Producer was not found");
      return
    }
    producers.current.delete(producer.id);
    producer.close();
    await emitRequest(SE.producerClosed, { producerId: producer.id })

  }


  const endCall = () => {
    if (!room) return
    window.location.pathname = room.id
  }
  //END CONTROL PANNEL ACTION HANDLERS


  const joinRoom = async () => {
    if (!userPeer) return
    if (!device.current) return;
    const peerInfo = {
      ...userPeer,
      rtpCapabilities: device.current.rtpCapabilities
    }
    try {
      // This will Handle browsers' new autoplay policy.
      // Access the mic and DO NOT close the mic track for a while.
      {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioTrack = stream.getAudioTracks()[0];

        audioTrack.enabled = false;

        setTimeout(() => audioTrack.stop(), 5000);
      }
      const res = await emitRequest(SE.joinRoom, { roomId, peerInfo });
      console.log(res)
      const allJoinedPeers: Peer[] = res.peers;
      for (const peer of allJoinedPeers) {
        dispatch(addPeer(peer))
      }
    } catch (error) {
      console.error(error)
    }
  }


  const createDevice = async () => {
    if (!room) return;
    try {
      const res = await emitRequest(SE.getRouterRtpCapabilities, {
        roomId: room.id,
        roomName: room.name
      });
      device.current = new Device();
      await device.current.load({ routerRtpCapabilities: res.routerRtpCapabilities });

      console.log('DEVICE CREATED')
    } catch (error) {
      console.log(error)
    }

  }

  const peerLeft = (data: Record<string, any>) => {
    console.log(data);
    dispatch(removePeer(data.peer.id))
  }
  const newPeer = (data: Record<string, any>) => {
    dispatch(addPeer(data.peer))
  }


  const newConsumer = async (data: Record<string, any>, callback: any) => {
    console.log('CREATING NEW CONSUMER');


    console.log(data);
    const { producerPeer, producerId, id, kind, rtpParameters, type, appData, transportId } = data;
    console.log('type', type)
    const recvTransport = recvTransports.current.get(transportId);

    if (!recvTransport) {
      console.log('TRANSPORT DOES NOT EXIT');
      callback(null, { error: 'CLIENT TRANSPORT REPLICA WAS NOT FOUND' });
      return
    }
    const consumer = await recvTransport.consume({
      id,
      producerId,
      kind,
      rtpParameters,
      appData: { ...appData, producerPeerId: producerPeer.id }, //producerPeerId is the trick to use to delete this later
    })

    if (!consumer) {
      console.log('CONSUMER CREATION FAILED');
      callback(null, { error: 'CLIENT CONSUMER CREATION FAILED' });
      return
    }
    // Store in consumer map
    consumers.current.set(consumer.id, consumer)

    // ! STEP >> 35


    const { track } = consumer;

    console.log('Track', track)



    const stream = new MediaStream([track])

    if (appData.source === 'screen') dispatch(updatePeer({ ...producerPeer, screen: stream }))
    if (appData.source === 'camera') dispatch(updatePeer({ ...producerPeer, video: stream }))
    if (appData.source === 'mic') dispatch(updatePeer({ ...producerPeer, mic: stream }))






    consumer.observer.on('close', () => {
      console.log('CONSUMER CLOSE @observer', consumer);
      if (appData.source === 'screen') dispatch(updatePeer({ ...producerPeer, screen: undefined }))
      if (appData.source === 'camera') dispatch(updatePeer({ ...producerPeer, video: undefined }))
      if (appData.source === 'mic') dispatch(updatePeer({ ...producerPeer, mic: undefined }))
    })
    consumer.on('transportclose', () => {
      console.log('Consumer transport closed')
    })
    console.log('Call callback');
    callback({}, null);
  }

  const consumerClosed = (data: Record<string, any>) => {
    const consumer = consumers.current.get(data.consumerId);
    if (!consumer) return;
    consumer.close();
  }

  const createWebRtcTransports = async () => {
    if (!room || !device.current) return
    try {
      const res = await emitRequest(SE.createWebRtcTransports, {
        roomId: room.id
      })

      const {
        consumerTransportParams,
        producerTransportParams
      } = res;
      // SEND TRANSPORT
      sendTransport.current = device.current.createSendTransport({
        id: producerTransportParams.id,
        iceParameters: producerTransportParams.iceParameters,
        iceCandidates: producerTransportParams.iceCandidates,
        dtlsParameters: producerTransportParams.dtlsParameters,

      })

      console.log('sendTransport', sendTransport)

      listenToSendTransport(sendTransport);


      // RECV TRANSPORT
      const recvTransport = device.current.createRecvTransport({
        id: consumerTransportParams.id,
        iceParameters: consumerTransportParams.iceParameters,
        iceCandidates: consumerTransportParams.iceCandidates,
        dtlsParameters: consumerTransportParams.dtlsParameters,
      })
      listenToRecvTransport(recvTransport);
      recvTransports.current.set(recvTransport.id, recvTransport);
    } catch (error) {
      console.log(error)
    }

    console.log('WEBRTC TRANSPORT CREATED');
  }


  const listenToSendTransport = (sendTransport: React.MutableRefObject<mediasoupTypes.Transport | undefined>) => {
    if (!sendTransport.current) return;
    // ! STEP >> 41-42
    sendTransport.current.on("connect", async ({ dtlsParameters }, callback, errback) => {
      console.log("sendTransportConnect")
      try {
        await emitRequest(SE.connectProducerTransport, { transportId: sendTransport.current!.id, dtlsParameters })
        callback();
      } catch (error) {
        errback(error as Error)
      }
    });

    // ! STEP >> 44
    sendTransport.current.on('produce', async ({ kind, rtpParameters, appData }, callback, errback) => {
      console.log('sendTransportProduce');
      try {
        const res = await emitRequest(SE.produceOnTransport, { transportId: sendTransport.current!.id, kind, rtpParameters, appData })
        callback({ id: res.producerId })
        console.log('Produced on the server with id', res.producerId)
      } catch (error) {
        errback(error as Error)
      }

    })

    sendTransport.current.on('connectionstatechange', (state) => {
      switch (state) {
        case 'connecting':
          console.log('connecting...');
          break;
        case 'connected':
          console.log('connected');
          break;
        case 'failed':
          console.log('failed');
          // sendTransport.current.close();
          break;
        default:
          break;
      }
    });
  }

  const listenToRecvTransport = (recvTransport: mediasoupTypes.Transport) => {
    // ! STEP >> 33
    recvTransport.on("connect", async ({ dtlsParameters }, callback, errback) => {
      console.log("recvTransportConnect", dtlsParameters)
      try {
        await emitRequest(SE.connectConsumerTransport, {
          transportId: recvTransport.id,
          dtlsParameters
        })
        callback();
      } catch (error) {
        errback(error as Error)
      }
    });

    recvTransport.on('connectionstatechange', (state) => {
      switch (state) {
        case 'connecting':
          console.log('connecting...');
          break;
        case 'connected':
          console.log('connected');
          break;
        case 'failed':
          console.log('failed');
          recvTransport.close();
          break;
        default:
          break;
      }
    });
  }


  const createConsumersForExistingPeers = async () => {
    if (!room) return
    try {
      const res = await emitRequest(SE.createConsumersForExistingPeers, { roomId: room.id })
      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    console.log('Goh 340')
    // ! STEP >> 1
    // GET MEETING INFO
    if (!userPeer) {
      navigate(`/${roomId}`);
      return;
    }
    console.log('Goh 347')

    const getRoom = async () => {
      try {
        const room = await getRoomById(roomId as string);
        setRoom(room);

      } catch (error) {
        navigate(`/${roomId}`);
      }
    }

    getRoom();


  }, [roomId, userPeer])


  useEffect(() => {
    if (!room) return
    console.log(room);
    ws.on('message', ({ eventType, data }, callback) => {
      switch (eventType) {
        case SE.connected:
          break;
        case SE.newPeer:
          // ! STEP >>  11 >
          newPeer(data)
          break;
        case SE.newConsumer:
          newConsumer(data, callback);
          break;
        case SE.consumerClosed:
          consumerClosed(data);
          break;
        case SE.peerLeft:
          peerLeft(data)
          break;
        default:
          break;
      }
    })

    const setUp = async () => {
      setIsReady(false);
      /**
        * !  STEP >> 2, 5 - 6
        * Get mediasoup router capabilities
        * create mediasoup client device
        */
      await createDevice();

      /**
       * ! STEP >> 6 
       * Set peer object 
       * Send request to join room
       */
      await joinRoom();

      /**
       * ! STEP >> 12, 19 - 22
       * Creat webrtctransports
       */
      await createWebRtcTransports();

      /**
       * ! STEP >> 23
       * Creat createConsumersForExistingPeers
       */
      await createConsumersForExistingPeers();

      setIsReady(true);

    }

    setUp();
    // createSendTransport()
    // getOtherProducer();
    return () => {
      ws.off('message');
    }
  }, [room])


  const emitRequest = (eventType: string, data: any): any => {
    return new Promise((resolve: any, reject: any) => {
      ws.emit('message', { eventType, data }, (response: any, error: any) => {
        if (!error) {
          resolve(response);
        } else {
          reject(error);
        }
      });
    });
  }

  if (!isReady) {
    return (<h1>Loading</h1>)
  }

  if (!userPeer) {
    return (<h1>Loading</h1>)
  }

  return (
    <div className='bg-neutral-900 h-screen flex  py-2  overflow-y-hidden'>
      <div className=" container mx-auto flex flex-col justify-between text-white  overflow-hidden">
        <div className=' text-center '>{room?.name}</div>
        <div className="flex-grow-1 flex flex-row overflow-hidden gap-x-4 my-2  ">
          <ParticipantPanel />

          <ActivityBoard />

          <ChatPanel />

        </div>

        <ControlPanel endCall={endCall} toggleCamera={toggleCamera} toggleMic={toggleMic} toggleScreen={toggleScreen} />
      </div>
    </div>
  )
}

export default Conference
