import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { SocketProvider } from './context/SocketContext';

const userEmail = localStorage.getItem('userEmail');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider userEmail={userEmail}>
      <App />
    </SocketProvider>
  </React.StrictMode>
);
