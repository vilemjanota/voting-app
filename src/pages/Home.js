import JoinForm from '../components/JoinForm'
import '../styles/Home.css'
import { useNavigate } from 'react-router-dom' 

function Home() {
    const navigate = useNavigate()

    return (
        <div>
            <button onClick={() => navigate('/create-session')}>Create Session</button> 
            <p>or join an existing one</p>
            <JoinForm />
        </div>
    )
}

export default Home
