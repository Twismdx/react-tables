import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import * as Ably from 'ably'
import { AblyProvider } from 'ably/react'

const client = new Ably.Realtime({ key: 'Yo4kvQ.jqBbLQ:d91k3xHWDPnw7T8kmH5qIMrbsNg75pw0L3CrU_8pFdQ', clientId: 'web' })

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AblyProvider client={client}>
      <ChannelProvider channelName='start'>
        <App />
      </ChannelProvider>
    </AblyProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
