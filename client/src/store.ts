import {configureStore} from '@reduxjs/toolkit';
import peerReducer from './reducers/peerSlice';
import chatReducer from './reducers/chatSlice'

const store = configureStore({
    reducer: {
        peers: peerReducer,
        chats: chatReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

