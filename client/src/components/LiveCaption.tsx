import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import hark from 'hark'
import { Peer } from '../utils/types';
import { Avatar } from 'antd';
import { getInitials } from '../utils/helpers';

interface CaptionProps {
    peerName: string;
    transcript: string;
}
const Caption: React.FC <CaptionProps> = ({peerName, transcript}) => {
    return (
        <div className=' flex gap-x-2'>
            <Avatar>{getInitials(peerName)}</Avatar>
        <div>
        <p>{peerName}</p>
        <p className='font-medium text-lg'>{transcript}</p>
        </div>
     </div>
    )
}

interface LiveCaptionProps {
    userPeer: Peer
}
const LiveCaption:React.FC<LiveCaptionProps> = ({userPeer}) => {
  const {
    transcript,

    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const options = {}

  useEffect(() => {
   
    if(!userPeer?.mic) return;
    const speechEvents = hark(userPeer.mic, options)

      // Event listeners for hark events
      speechEvents.on('speaking', () => {
        console.log('Speaking detected');
        SpeechRecognition.startListening()

        // Do something when speaking is detected
      });

      speechEvents.on('stopped_speaking', () => {
        console.log('Stopped speaking');
        // SpeechRecognition.stopListening()
        // Do something when speaking stops
      });

    //   speechEvents.on('volume_change', (volume, threshold) => {
    //     console.log('Volume change:', volume, 'Threshold:', threshold);
    //     // Do something with volume change
    //   });

      // Clean up by stopping hark when the component unmounts
      return () => {
        speechEvents.stop();
      };

  }, [userPeer?.mic])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }



  return (
    <div className=' text-white my-3 max-h-48 overflow-y-auto '>
      {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
      {/* <button onClick={SpeechRecognition.startListening}>Start</button> */}
      {/* <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button> */}
        <Caption peerName={userPeer.name} transcript={transcript}/>
    </div>
  );
};
export default LiveCaption;
