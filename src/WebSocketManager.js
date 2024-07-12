let webSocket = null;

export const getWebSocket = () => {
  if (!webSocket) {
    webSocket = new WebSocket('ws://localhost:3000');
    webSocket.onclose = () => {
      console.log('WebSocket closed. Clearing reference.');
      webSocket = null;
    };
    // Add more event listeners as needed (e.g., onopen, onmessage, onerror)
  }
  return webSocket;
};

export const closeWebSocket = () => {
  if (webSocket) {
    webSocket.close();
  }
};