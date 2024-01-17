import Axios from "./Axios"
import { Room } from "./types"

export const  getInitials = (name: string): string => {
    const words = name.split(' ');
    const initials = words.map((word) => word.charAt(0));
    return initials.join('').toUpperCase();
}


export const getToken = async () => {

}

export const createSession = async () => {

}

export const createConnection = async () => {

}

export const getUserHomeRoom = async (userId: string): Promise<Room> => {
    try {
        const response = await Axios.get(`/rooms/user/${userId}/home`);
        const room: Room = response.data;
        return room;
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const getUserRooms = async (userId: string): Promise<Room[]> => {
    try {
        const response = await Axios.get(`/rooms/user/${userId}`);
        const room: Room[] = response.data;
        return room;
    } catch (error) {
        console.log(error);
        throw error
    }
}
export const getRoomById = async (roomId: string): Promise<Room> => {
    try {
        const response = await Axios.get(`/rooms/${roomId}`);
        const room: Room = response.data;
        return room;
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const getUserByRoomId = async (roomId: string) => {
    try {
        const response = await Axios.get(`/rooms/${roomId}/owner`);
        const user = response.data;
        return user;
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const getPeerBoxSize = (peersLength: number ) => {
    let size = '100%'
    if (peersLength === 1) size = '100%';
    if (peersLength > 1) size = '48%';
    if (peersLength > 4) size = '32%';
    if (peersLength > 9) size = '23%';
    if (peersLength > 20) size = '18.5%';
    return size;
  }
