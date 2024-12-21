import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import UserProvider from './lib/Provider/UserProvider'
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>,
)
