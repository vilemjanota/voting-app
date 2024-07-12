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
                sessions[sessionCode] = { users: [ws], option1: data.option1, option2: data.option2 }
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
                ws.send(JSON.stringify({ type: 'join', data: { option1: sessions[sessionCode].option1, option2: sessions[sessionCode].option2 } }))
            }
        }

        else if (type === 'remove-vote') {
            if (sessions[sessionCode]) {
                //update the vote count
                sessions[sessionCode].option1.count -= data === 'option1' ? 1 : 0
                sessions[sessionCode].option2.count -= data === 'option2' ? 1 : 0
            }
        }

        else if (type === 'vote') {
            if (sessions[sessionCode]) {

                //update the vote count
                sessions[sessionCode].option1.count += data === 'option1' ? 1 : 0
                sessions[sessionCode].option2.count += data === 'option2' ? 1 : 0

                //send the vote count to all users
                sessions[sessionCode].users.forEach(user => {
                    user.send(JSON.stringify({ type: 'vote', data: { option1: sessions[sessionCode].option1, option2: sessions[sessionCode].option2 } }))
                    if (user === ws) {
                        user.send(JSON.stringify({ type: 'your-vote', data })) //send the user their vote
                    }
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