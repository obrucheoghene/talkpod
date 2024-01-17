import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import "antd/dist/reset.css"
import RoomProvider from './contexts/RoomContext'
import AuthProvider from './contexts/AuthContext'
import { Provider } from 'react-redux'
import store from './store.js'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <AuthProvider>
      <RoomProvider>
        <Provider store={store}>
        <App />
        </Provider>
       
      </RoomProvider>
    </AuthProvider>
  // </React.StrictMode>,
)
