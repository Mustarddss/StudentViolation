import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const SidebarItem = ({ label, active = false }) => {
    return (
        <div className={`sidebar-item${active ? ' active' : ''}`}>{label}</div>
    )
}

const Dashboard = ({ user, onLogout }) => {
    return (
        <div className="dashboard">
            <aside className="sidebar">
                <div className="sidebar-brand">
                    <img className="sidebar-logo" src="/nj-logo.png" alt="NJ Logo" />
                    <div>
                        STUDENT VIOLATION<br/>TRACKING
                    </div>
                </div>
                <div className="sidebar-welcome">Welcome, <b>{user?.name || 'User'}</b></div>
                <Link to="/" className={`sidebar-item ${useLocation().pathname === '/' ? 'active' : ''}`}>DASHBOARD</Link>
                <Link to="/student-info" className={`sidebar-item ${useLocation().pathname === '/student-info' ? 'active' : ''}`}>STUDENT INFO</Link>
                <Link to="/violations" className={`sidebar-item ${useLocation().pathname === '/violations' ? 'active' : ''}`}>VIOLATIONS</Link>
                <Link to="/sms-logs" className={`sidebar-item ${useLocation().pathname === '/sms-logs' ? 'active' : ''}`}>SMS LOGS</Link>
                <Link to="/email-logs" className={`sidebar-item ${useLocation().pathname === '/email-logs' ? 'active' : ''}`}>EMAIL LOGS</Link>
                <Link to="/acknowledgement" className={`sidebar-item ${useLocation().pathname === '/acknowledgement' ? 'active' : ''}`}>ACKNOWLEDGEMENT</Link>
                <Link to="/appointments" className={`sidebar-item ${useLocation().pathname === '/appointments' ? 'active' : ''}`}>APPOINTMENTS</Link>
                <Link to="/reports" className={`sidebar-item ${useLocation().pathname === '/reports' ? 'active' : ''}`}>REPORTS</Link>
                <button className="btn small dark" onClick={onLogout} style={{marginTop:12}}>Logout</button>
            </aside>

            <Outlet />
        </div>
    )
}

export default Dashboard


