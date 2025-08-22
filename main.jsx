import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Dashboard from './Dashboard.jsx'
import Home from './Home.jsx'
import StudentInfo from './StudentInfo.jsx'
import Violations from './Violations.jsx'
import SmsLogs from './SmsLogs.jsx'
import EmailLogs from './EmailLogs.jsx'
import Acknowledgement from './Acknowledgement.jsx'
import Appointments from './Appointments.jsx'
import Reports from './Reports.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles.css'

const Root = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState({ name: 'Ronald Allan' })
    const handleSignIn = () => setLoggedIn(true)
    const handleSignOut = () => setLoggedIn(false)
    return loggedIn ? (
        <BrowserRouter>
            <Routes>
                <Route element={<Dashboard user={user} onLogout={handleSignOut} /> }>
                    <Route path="/" element={<Home />} />
                    <Route path="/student-info" element={<StudentInfo />} />
                    <Route path="/violations" element={<Violations />} />
                    <Route path="/sms-logs" element={<SmsLogs />} />
                    <Route path="/email-logs" element={<EmailLogs />} />
                    <Route path="/acknowledgement" element={<Acknowledgement />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/reports" element={<Reports />} />
                </Route>
            </Routes>
        </BrowserRouter>
    ) : (
        <App onSignIn={handleSignIn} />
    )
}

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
)


