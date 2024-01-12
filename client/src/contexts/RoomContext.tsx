import { ReactNode, createContext, useEffect,  useState } from "react";

import socketIOClient, { Socket } from "socket.io-client"
import { SERVER_BASE_URL  } from "../utils/constants";
import { Participant, Peer,  } from "../utils/types";

interface RoomContextValue {
    ws: Socket;
    userPeer: Peer | null;
    stream: MediaStream | null;
    participants: Participant[];
    isMicOn: boolean;
    isCameraOn: boolean;
    isScreenShareOn: boolean;
    showParticipant: boolean;
    showChat: boolean;
    setUserPeer: React.Dispatch<React.SetStateAction<Peer | null>>;
    setStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
    setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
    setIsScreenShareOn: React.Dispatch<React.SetStateAction<boolean>>;
    setIsCameraOn: React.Dispatch<React.SetStateAction<boolean>>;
    setIsMicOn: React.Dispatch<React.SetStateAction<boolean>>;
    setShowParticipant: React.Dispatch<React.SetStateAction<boolean>>;
    setShowChat: React.Dispatch<React.SetStateAction<boolean>>;

}
const ws: Socket = socketIOClient(SERVER_BASE_URL)

export const RoomContext = createContext<RoomContextValue>({
    ws: ws,
    userPeer: null,
    stream: null,
    participants: [],
    isMicOn: false,
    isCameraOn: false,
    isScreenShareOn: false,
    showParticipant: false,
    showChat: false,
    setUserPeer: () => { },
    setStream: () => { },
    setParticipants: () => { },
    setIsCameraOn: () => { },
    setIsScreenShareOn: () => { },
    setIsMicOn: () => { },
    setShowParticipant: () => { },
    setShowChat: () => { },
});


interface RoomProviderProps {
    children: ReactNode
}
const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
    const [userPeer, setUserPeer] = useState<Peer|null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [participants, setParticipants] = useState<Participant[]>([])
    const [isScreenShareOn, setIsScreenShareOn] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isMicOn, setIsMicOn] = useState(false );
    const [showParticipant, setShowParticipant] = useState<boolean>(false);
    const [showChat, setShowChat] = useState<boolean>(false);


    useEffect(() => {
        
        return () => {
            ws.off('message')
        }
    }, []);


    return <RoomContext.Provider value={{
        ws, userPeer, stream,  participants,
        isCameraOn, isMicOn, isScreenShareOn,
        showParticipant, showChat,
        setParticipants, setUserPeer, setStream,
        setIsCameraOn, setIsMicOn, setIsScreenShareOn,
        setShowParticipant, setShowChat
    }}>
        {children}
    </RoomContext.Provider>
}

export default RoomProvider
