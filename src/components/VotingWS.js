import '../styles/Voting.css'
import { useState, useEffect } from 'react'
import { useWebSocket } from '../WebSocketContext'

function VotingWS({ sessionCode }) {
  const ws = useWebSocket()

    const sendVote = (vote) => {
      ws.send(JSON.stringify({ type: 'vote', sessionCode, data: vote }))
    }

    return (
        <div>
            <div className='options'>
                <button onClick={() => sendVote('Option1')}>Option 1</button>
                <button onClick={() => sendVote('Option2')}>Option 2</button>
            </div>
        </div>
    )
}

export default VotingWS