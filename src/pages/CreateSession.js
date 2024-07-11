import { useNavigate } from 'react-router-dom'
import { useWebSocket } from '../WebSocketContext'

function CreateSession() {
    const ws = useWebSocket()
    const navigate = useNavigate()
    const code = Math.random().toString(36).substring(2, 8)

    const handleCreateSession = () => {
        ws.send(JSON.stringify({ type: 'create', sessionCode: code, data: '' }))
        navigate('/session', { state: { sessionCode: code } })
    }

    return (
        <div>
            <h1>Creating a session</h1>
            <h4>Session code: {code}</h4>
            <button onClick={() => handleCreateSession()}>Done</button>
            {/* add form to join session */}
        </div>
    )
}

export default CreateSession
