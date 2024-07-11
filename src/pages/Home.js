import '../styles/Home.css'
import { useNavigate } from 'react-router-dom' 

function Home() {
    const navigate = useNavigate()

    return (
        <div>
            <button onClick={() => navigate('/create-session')}>Create Session</button> 
            {/* add form to join session */}
        </div>
    )
}

export default Home
