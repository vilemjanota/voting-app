import CreateForm from '../components/CreateForm'

function CreateSession() {
    const sessionCode = Math.random().toString(36).substring(2, 8)

    return (
        <div>
            <h1>Creating a session</h1>
            <h4>Session code: {sessionCode}</h4>
            <CreateForm  sessionCode={sessionCode}/>
        </div>
    )
}

export default CreateSession
