import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import * as Ably from 'ably'
import { AblyProvider, useChannel, usePresence } from 'ably/react'

const client = {
  key: '9zzpLg.YrD7jw:RCOMB9Lq4mkx0-5Zn99PFY4iKEA1WtvpBWG-5fRkv0M',
  clientId: 'receiver',
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AblyProvider client={client}>
      <App />
    </AblyProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
