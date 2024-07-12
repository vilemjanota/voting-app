import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../styles/CreateForm.css'

function JoinForm() {
    const navigate = useNavigate()
    const [sessionCode, setSessionCode] = useState('')

    const handleSubmit = () => {
        navigate('/session', { state: { sessionCode } })
    }

    return (
        <form className='form-container' onSubmit={handleSubmit}>
            <input
                className='form-input'
                type='text'
                onChange={(event) => setSessionCode(event.target.value)}
                placeholder='CODE'
            />
            <button
                className='form-button'
                type='submit'
            >
                Join
            </button>
        </form>
    )
}

export default JoinForm;