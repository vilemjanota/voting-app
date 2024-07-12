import '../styles/Voting.css'
import { useState, useEffect } from 'react'
import { useWebSocket } from '../WebSocketContext'

function VotingWS({ ws, sessionCode, options }) {
    const sendVote = (vote) => {
        ws.send(JSON.stringify({ type: 'vote', sessionCode, data: vote }))
    }
    useEffect(() => {

        const handleOpen = () => {
            ws.send(JSON.stringify({ type: 'join', sessionCode }));
        };

        // Check if WebSocket is already open; if not, listen for the open event
        if (ws.readyState === WebSocket.OPEN) {
            handleOpen();
        } else {
            ws.addEventListener('open', handleOpen);
        }
    }, [ws])

    return (
        <div>
            <div className='options'>
                <button className='option1' onClick={() => sendVote('Option1')}>{options.option1}</button>
                <button className='option2' onClick={() => sendVote('Option2')}>{options.option2}</button>
            </div>
        </div>
    )
}

export default VotingWS