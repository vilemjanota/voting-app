import React, { createContext, useContext, useEffect, useState } from 'react'

// Create a context
const WebSocketContext = createContext(null)

// Export a hook to use the WebSocket context
export const useWebSocket = () => useContext(WebSocketContext)

// WebSocket Provider component
export const WebSocketProvider = ({ children }) => {
    const [webSocket, setWebSocket] = useState(null)

    useEffect(() => {
        // Initialize WebSocket connection
        const ws = new WebSocket('ws://localhost:3000')
        setWebSocket(ws)

        // Cleanup on unmount
        return () => {
            if (ws) {
                ws.close()
            }
        }
    }, [])

    return (
        <WebSocketContext.Provider value={webSocket}>
            {children}
        </WebSocketContext.Provider>
    )
}