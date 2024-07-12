import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useWebSocket } from '../WebSocketContext'
import '../styles/CreateForm.css'

function CreateForm({ sessionCode }) {
    const { getWebSocket, closeWebSocket } = useWebSocket();
    const ws = getWebSocket(); // Get the WebSocket instance
    const navigate = useNavigate()
    const [option1, setOption1] = useState('Option 1')
    const [option2, setOption2] = useState('Option 2')

    const handleSubmit = () => {
        ws.send(JSON.stringify({ type: 'create', sessionCode, data: { option1: option1, option2: option2 }}))
        navigate('/session', { state: { sessionCode } })
    }

    return (
        <form className='form-container' onSubmit={handleSubmit}>
            <input
                className='form-input'
                type='text'
                onChange = {(event) => setOption1(event.target.value)}
                placeholder='Option 1'
            />
            <input
                className='form-input'
                type='text'
                onChange = {(event) => setOption2(event.target.value)}
                placeholder='Option 2'
            />
            <button
                className='form-button'
                type='submit'
            >
                create
            </button>
        </form>
    )
}

export default CreateForm;