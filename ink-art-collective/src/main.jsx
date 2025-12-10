import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Note o 'app' minúsculo para combinar com seu arquivo
import './index.css' // <--- ESSA LINHA É A MAIS IMPORTANTE!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)