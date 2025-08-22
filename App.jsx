import React, { useState } from 'react'

const App = ({ onSignIn }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleDemoLogin = () => {
        // Demo-only: accept any non-empty values or a fixed credential
        const isValid = (username && password) || (username === 'demo' && password === 'demo')
        if (isValid) {
            onSignIn?.()
        } else {
            setError('Enter any username and password to continue (demo).')
        }
    }
    return (
        <div className="page login-page">
            <div className="split">
                <div className="image-panel">
                    <img src="/login_image.png" alt="Login background" />
                </div>
                <div className="form-panel">
                    <div className="nj-header">
                        <img className="nj-logo" src="/nj-logo.png" alt="NJ Logo" />
                        <div className="nj-title">STUDENT VIOLATION TRACKING SYSTEM</div>
                        <div className="nj-signin">SIGN IN</div>
                    </div>
                    <div className="signin-card">
                        <div className="form-fields">
                            <label>
                                <span>Username/Employee ID</span>
                                <input placeholder="Username/Employee ID" value={username} onChange={e => setUsername(e.target.value)} />
                            </label>
                            <label>
                                <span>Password</span>
                                <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                            </label>
                            {error && <div className="error-text">{error}</div>}
                            <button className="link" type="button">Forgot password?</button>
                            <button className="primary" type="button" onClick={handleDemoLogin}>Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App


