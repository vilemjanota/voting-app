import '../styles/Voting.css'
import { useState, useEffect } from 'react'

function VotingWS({ ws, sessionCode, options }) {
    const [vote,setVote] = useState('')

    const sendVote = (vote) => {
        ws.send(JSON.stringify({ type: 'vote', sessionCode, data: vote }))
    }

    const removeVote = (vote) => {
        ws.send(JSON.stringify({ type: 'remove-vote', sessionCode, data: vote }))
    }

    const handleClick = (option) => { //send vote to server
        if(vote === option){
            removeVote(option)
            sendVote('')
            setVote('')
        }
        else{
            removeVote(vote)
            sendVote(option)
            setVote(option)
        }
    }

    useEffect(() => { //remove vote when user leaves the page
        const handleBeforeUnload = (event) => {
            removeVote(vote);
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
            removeVote(vote);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [vote]);

    useEffect(() => { //get session data when user joins
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
                <button className={`${vote === 'option1' ? 'voted' : 'notVoted'}`} onClick={() => handleClick('option1')}>{options.option1}</button>
                <button className={`${vote === 'option2' ? 'voted' : 'notVoted'}`} onClick={() => handleClick('option2')}>{options.option2}</button>
            </div>
        </div>
    )
}

export default VotingWS