import React, { useMemo, useState } from 'react'

const EmailLogs = () => {
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [showFilters, setShowFilters] = useState(false)
    const [fIncident, setFIncident] = useState('')
    const [fEmailId, setFEmailId] = useState('')
    const [fSent, setFSent] = useState('')

    const rows = Array.from({ length: 7 }).map((_, idx) => ({
        emailId: String(987654321 + idx),
        incident: idx === 0 ? 'No ID' : 'INC-20' + idx,
        recipientEmail: idx % 2 ? 'Mahagis@gmail.com' : 'guardian@example.com',
        guardian: idx % 2 ? 'Magahis' : 'Sean Creencia',
        student: idx % 2 ? 'Irish' : 'Juan Dela Cruz',
        subject: 'Violation Notice',
        dateCreated: idx === 0 ? 'Aug 12 2025, 12:00' : `Aug 1${idx} 2025, 12:00`,
        timestamp: idx === 0 ? 'Aug 12 2025, 12:12' : `Aug 1${idx} 2025, 13:2${idx}`,
        status: idx % 3 === 1 ? 'FAILED' : 'SENT',
        sentBy: 'chuchu (DO office)',
        gateway: 'Email API',
        attachments: 'None',
        retryCount: 1,
        content: 'Good day, this is to notify you that your child Juan Dela Cruz was reported late on Aug 12, 2025.'
    }))

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        return rows
            .filter(r => {
                if (!q) return true
                return (
                    r.emailId.toLowerCase().includes(q) ||
                    r.incident.toLowerCase().includes(q) ||
                    r.timestamp.toLowerCase().includes(q)
                )
            })
            .filter(r =>
                r.incident.toLowerCase().includes(fIncident.toLowerCase()) &&
                r.emailId.toLowerCase().includes(fEmailId.toLowerCase()) &&
                r.timestamp.toLowerCase().includes(fSent.toLowerCase())
            )
    }, [query, fIncident, fEmailId, fSent])

    const clearFilters = () => { setQuery(''); setFIncident(''); setFEmailId(''); setFSent('') }

    return (
        <main className="content">

            <section className="panel">
                <h3>EMAIL LOGS</h3>
                <div className="searchbar-row">
                    <input className="search-input" placeholder="Search by Incident # / Email ID / Sent Date" value={query} onChange={e => setQuery(e.target.value)} />
                    <button className="btn small dark" type="button" onClick={() => setShowFilters(v => !v)}>{showFilters ? 'Hide Filters' : 'Filter'}</button>
                </div>
                {showFilters && (
                    <div className="filter-bar">
                        <div className="filters">
                            <div className="filter-field">
                                <input className="input-sm" placeholder="Incident #" value={fIncident} onChange={e => setFIncident(e.target.value)} />
                            </div>
                            <div className="filter-field">
                                <input className="input-sm" placeholder="Email ID" value={fEmailId} onChange={e => setFEmailId(e.target.value)} />
                            </div>
                            <div className="filter-field">
                                <input className="input-sm" placeholder="Sent Date" value={fSent} onChange={e => setFSent(e.target.value)} />
                            </div>
                            <div className="filter-actions">
                                <button className="btn small secondary" type="button">Filter</button>
                                <button className="btn small dark" type="button" onClick={clearFilters}>Clear</button>
                            </div>
                        </div>
                    </div>
                )}
                <table className="table">
                    <thead>
                        <tr>
                            <th>EMAIL ID</th>
                            <th>INCIDENT #</th>
                            <th>Guardian's Name</th>
                            <th>Message Content</th>
                            <th>Sent Timestamp</th>
                            <th>STATUS</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((r, i) => (
                            <tr key={i}>
                                <td>{r.emailId}</td>
                                <td>{r.incident}</td>
                                <td>{r.guardian}</td>
                                <td>{r.content}</td>
                                <td>{r.timestamp}</td>
                                <td>{r.status}</td>
                                <td><button className="btn small dark" onClick={() => { setSelected(r); setOpen(true) }}>View</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            {open && selected && (
                <div className="modal-overlay" onClick={() => setOpen(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>EMAIL LOG DETAILS</h3>
                            <button className="icon-btn" onClick={() => setOpen(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="details">
                                <div className="detail"><span>Email ID:</span> {selected.emailId}</div>
                                <div className="detail"><span>Incident #:</span> {selected.incident}</div>
                                <div className="detail"><span>Recipient Email:</span> {selected.recipientEmail}</div>
                                <div className="detail"><span>Guardian's Name:</span> {selected.guardian}</div>
                                <div className="detail"><span>Student Name:</span> {selected.student}</div>
                                <div className="detail"><span>Subject:</span> {selected.subject}</div>
                                <div className="detail"><span>Date Created:</span> {selected.dateCreated}</div>
                                <div className="detail"><span>Sent Timestamp:</span> {selected.timestamp}</div>
                                <div className="detail"><span>Status:</span> {selected.status}</div>
                                <div className="detail"><span>Sent By:</span> {selected.sentBy}</div>
                                <div className="detail"><span>Gateway:</span> {selected.gateway}</div>
                                <div className="detail"><span>Attachments:</span> {selected.attachments}</div>
                                <div className="detail"><span>Retry Count:</span> {selected.retryCount}</div>
                            </div>
                            <div className="field">
                                <span>Email Content:</span>
                                <textarea rows={6} readOnly value={selected.content} />
                            </div>
                            <div className="modal-footer">
                                <button className="btn secondary" onClick={() => setOpen(false)}>Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

export default EmailLogs


