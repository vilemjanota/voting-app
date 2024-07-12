import '../styles/Session.css'
import Voting from '../components/Voting'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useWebSocket } from '../WebSocketContext'

function Session() {
    const { getWebSocket, closeWebSocket } = useWebSocket();
    const ws = getWebSocket();
    const location = useLocation()
    const { sessionCode } = location.state || {}
    const [option1, setOption1] = useState([{ name: '', count: '' }])
    const [option2, setOption2] = useState([{ name: '', count: '' }])

    useEffect(() => {
        ws.onmessage = (event) => {
            const { type, data } = JSON.parse(event.data)
            if (type === 'vote') {
                setOption1(data.option1)
                setOption2(data.option2)
            }
            if (type === 'join') {
                setOption1(data.option1)
                setOption2(data.option2)
            }
        }
    }, [ws])

    return (
        <div className="session">
            <h1>Vote for your favorite option!</h1>
            <h4>Session code: {sessionCode}</h4>
            <div className='options-container'>
                <h2>{option1.name}:{option1.count}</h2>
                <h2>{option2.name}:{option2.count}</h2>                
            </div>
            <p>Your Vote:</p>
            <Voting ws={ws} sessionCode={sessionCode} options={{ option1: option1.name, option2: option2.name }} />
        </div>
    )
}

export default Session
