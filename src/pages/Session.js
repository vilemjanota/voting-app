import '../styles/App.css'
import VotingWS from '../components/VotingWS'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useWebSocket } from '../WebSocketContext'

function Session() {
    const { getWebSocket, closeWebSocket } = useWebSocket();
    const ws = getWebSocket();
    const location = useLocation()
    const { sessionCode } = location.state || {}
    const [options, setOptions] = useState({ option1: '', option2: '' })

    useEffect(() => {
        ws.onmessage = (event) => {
            const { type, data } = JSON.parse(event.data)
            if (type === 'vote') {
                document.querySelector('.vote').innerText = data
            }
            if (type === 'join') {
                setOptions(data)
            }
        }
    }, [ws])

    return (
        <div className="Session">
            <h1>Vote for your favorite option!</h1>
            <h4>Session code: {sessionCode}</h4>
            <p className='vote'>vote:</p>
            <VotingWS ws={ws} sessionCode={sessionCode} options={options} />
        </div>
    )
}

export default Session
