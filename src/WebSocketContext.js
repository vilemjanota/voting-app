import React, { createContext, useContext, useEffect } from 'react';
import { getWebSocket, closeWebSocket } from './WebSocketManager';

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
  useEffect(() => {
    // Initialize WebSocket connection
    const ws = getWebSocket();

    // Cleanup on unmount
    return () => {
      closeWebSocket();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ getWebSocket, closeWebSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};