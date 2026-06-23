import './LoginPage.css'
import { useState } from 'react'

export default function LoginPage({loginUser}) { //pass down function that sends user info to backend to authenticate
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        if (username.length >= 8 && password.length >= 8) {
            loginUser(username, password);
            setUsername('');
            setPassword('');
        }
    }

    return (
    <div>
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <p>Username</p>
                <input type="text" placeholder="Enter your username..." value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <p>Password</p>
                <input type="password" placeholder="Enter your password..." value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">Enter</button>
            </form>
            
        </div>
    </div>
    )
}