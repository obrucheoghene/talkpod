import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Chat } from "../utils/types";

export  type ChatState = Chat[]

const initialState: ChatState = [];

const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers : {
        addChat: (state, action: PayloadAction<Chat>) => {
            state.push(action.payload);
        }   
    }
})

export default chatSlice.reducer;
export const {addChat} = chatSlice.actions;
