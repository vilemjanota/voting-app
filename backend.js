const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const sessions = {
  // sessionCode: { users: [ws1, ws2, ws3] }
}

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const { type, sessionCode, data } = JSON.parse(message)
    
    if (type === 'create') {
      if (sessions[sessionCode]) {
        console.log('Session already exists')
      }
      else {
        sessions[sessionCode] = { users: [ws] }
        console.log('Session created')
      }
    } 

    else if (type === 'join') {
      if (!sessions[sessionCode]) {
        console.log('Session does not exist')
      }
      else {
        sessions[sessionCode].users.push(ws)
      }
    }

    else if (type === 'vote') {
      // Broadcast vote to all users in the session
      if(sessions[sessionCode]) {
        sessions[sessionCode].users.forEach(user => {
          //if (user !== ws) {
            user.send(JSON.stringify({ type: 'vote', data }))
          //}
        })        
      }
      else {
        console.log('Session does not exist')
      }
    }

  })
})

server.listen(3000, () => {
  console.log('Server started on port 3000')
})