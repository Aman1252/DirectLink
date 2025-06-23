import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children, userEmail }) {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:5000', {
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket connected');
      setIsConnected(true);

      if (userEmail) {
      socket.emit('identify', userEmail);
      console.log(`Registered user: ${userEmail}`);
  }
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
    });

    socket.on('disconnect', () => {
      console.warn('Socket disconnected');
      setIsConnected(false);
    });

    return () => socket.disconnect();
  }, []);

  // Send identify **after** socket is connected and userEmail is ready
  useEffect(() => {
    if (isConnected && userEmail && socketRef.current) {
      socketRef.current.emit('identify', userEmail);
      console.log(`Sent identify for ${userEmail}`);
    }
  }, [isConnected, userEmail]);

  if (!isConnected) return null; // Prevent rendering until socket is connected

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
}
