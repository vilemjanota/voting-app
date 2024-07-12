const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const sessions = {}

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const { type, sessionCode, data } = JSON.parse(message)
    
    if (type === 'create') {
      if (sessions[sessionCode]) {
        console.log('Session already exists')
      }
      else {
        sessions[sessionCode] = { users: [ws], option1: data.option1, option2: data.option2}
        console.log('Session created')
      }
    } 

    else if (type === 'join') {
      if (!sessions[sessionCode]) {
        console.log('Session does not exist')
      }
      else {
        console.log('User joined session')
        sessions[sessionCode].users.push(ws)
        ws.send(JSON.stringify({ type: 'join', data: { option1: sessions[sessionCode].option1, option2: sessions[sessionCode].option2 }}))
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