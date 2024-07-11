import '../styles/Voting.css';
import { useState, useEffect } from 'react';

function Voting() {
    const [options, setOptions] = useState([0, 0, 0]);
    const [vote, setVote] = useState(0);

    useEffect(() => {
        const updatedOptions = options.map((val, index) => {
            if (index === vote) {
                return 1;
            }
            return 0;
        });
        setOptions(updatedOptions);
    }, [vote]);

    return (
        <div>
            <div>
                <p>Option0: {options[0]}</p>
                <p>Option1: {options[1]}</p>
                <p>Option2: {options[2]}</p>
            </div>
            <div className='options'>
                <button className={`${vote === 1 ? 'voted' : 'notVoted'}`} onClick={() => setVote(1)}>Option 1</button>
                <button className={`${vote === 2 ? 'voted' : 'notVoted'}`} onClick={() => setVote(2)}>Option 2</button>
            </div>
        </div>
    );
}

export default Voting;