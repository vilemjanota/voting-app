import '../styles/App.css'
import VotingWS from '../components/VotingWS'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useWebSocket } from '../WebSocketContext'

function Session() {
    const ws = useWebSocket()
    const location = useLocation()
    const { sessionCode } = location.state || {}


    useEffect(() => {
      ws.onmessage = (event) => {
        console.log('event' + event.data)
        const { type, data } = JSON.parse(event.data)
        if (type === 'vote') {
            document.querySelector('.vote').innerText = data
        }
        else {
            document.querySelector('.vote').innerText = 'data not received'
        }
      }
    }, [])

    return (
        <div className="Session">
            <h1>Vote for your favorite option!</h1>
            <h4>Session code: {sessionCode}</h4>
            <p className='vote'>vote:</p>
            <VotingWS sessionCode={sessionCode} />
        </div>
    )
}

export default Session
