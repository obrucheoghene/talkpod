import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Peer } from "../utils/types";

export type PeerState = Record<string, Peer>

const initialState: PeerState = {}

const peerSlice = createSlice({
    name: 'peers',
    initialState,
    reducers: {
        addPeer: (state, action: PayloadAction<Peer>) => {
            state[action.payload.id] = action.payload
        },
        updatePeer: (state, action: PayloadAction<Peer>) => {
            state[action.payload.id] = {...state[action.payload.id], ...action.payload }
        },
        removePeer: (state, action: PayloadAction<string>) => {
            delete state[action.payload];
        }
    }
})

export default peerSlice.reducer;
export const {addPeer, updatePeer, removePeer} = peerSlice.actions
