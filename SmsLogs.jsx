import React, { useMemo, useState } from 'react'

const SmsLogs = () => {
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [showFilters, setShowFilters] = useState(false)
    const [fIncident, setFIncident] = useState('')
    const [fSmsId, setFSmsId] = useState('')
    const [fSent, setFSent] = useState('')

    const rows = Array.from({ length: 7 }).map((_, idx) => ({
        smsId: String(86767860 + idx),
        incident: idx === 0 ? 'No ID' : 'INC-10' + idx,
        guardian: idx % 2 ? 'Magahis' : 'Sean Creencia',
        student: idx % 2 ? 'Irish' : 'Juan Dela Cruz',
        content: 'Good day, your child Juan Dela Cruz was reported for being late on Aug 12, 2025.',
        timestamp: idx === 0 ? 'Aug 12 2025, 12:12' : `Aug 0${idx} 2025, 11:3${idx}`,
        dateCreated: idx === 0 ? 'Aug 12 2025, 12:00' : `Aug 0${idx} 2025, 11:00`,
        sentBy: 'chuchu (DO office)',
        gateway: 'GlobeSMS_API',
        retryCount: 1,
        recipientNumber: '+63 912 345 6789',
        messageType: 'Violation Notice',
        status: idx % 3 === 1 ? 'FAILED' : 'SENT',
    }))

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        return rows
            .filter(r => {
                if (!q) return true
                return (
                    r.smsId.toLowerCase().includes(q) ||
                    r.incident.toLowerCase().includes(q) ||
                    r.timestamp.toLowerCase().includes(q)
                )
            })
            .filter(r =>
                r.incident.toLowerCase().includes(fIncident.toLowerCase()) &&
                r.smsId.toLowerCase().includes(fSmsId.toLowerCase()) &&
                r.timestamp.toLowerCase().includes(fSent.toLowerCase())
            )
    }, [query, fIncident, fSmsId, fSent])

    const clearFilters = () => { setQuery(''); setFIncident(''); setFSmsId(''); setFSent('') }

    return (
        <main className="content">

            <section className="panel">
                <h3>SMS LOGS</h3>
                <div className="searchbar-row">
                    <input className="search-input" placeholder="Search by Incident # / SMS ID / Sent Date" value={query} onChange={e => setQuery(e.target.value)} />
                    <button className="btn small dark" type="button" onClick={() => setShowFilters(v => !v)}>{showFilters ? 'Hide Filters' : 'Filter'}</button>
                </div>
                {showFilters && (
                    <div className="filter-bar">
                        <div className="filters">
                            <div className="filter-field">
                                <input className="input-sm" placeholder="Incident #" value={fIncident} onChange={e => setFIncident(e.target.value)} />
                            </div>
                            <div className="filter-field">
                                <input className="input-sm" placeholder="SMS ID" value={fSmsId} onChange={e => setFSmsId(e.target.value)} />
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
                            <th>SMS ID</th>
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
                                <td>{r.smsId}</td>
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
                            <h3>SMS LOG DETAILS</h3>
                            <button className="icon-btn" onClick={() => setOpen(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="details">
                                <div className="detail"><span>Sms ID:</span> {selected.smsId}</div>
                                <div className="detail"><span>Incident #:</span> {selected.incident}</div>
                                <div className="detail"><span>Guardian's Name:</span> {selected.guardian}</div>
                                <div className="detail"><span>Student Name:</span> {selected.student}</div>
                                <div className="detail"><span>Recipient Number:</span> {selected.recipientNumber}</div>
                                <div className="detail"><span>Message Type:</span> {selected.messageType}</div>
                                <div className="detail"><span>Date Created:</span> {selected.dateCreated}</div>
                                <div className="detail"><span>Sent Timestamp:</span> {selected.timestamp}</div>
                                <div className="detail"><span>Status:</span> {selected.status}</div>
                                <div className="detail"><span>Sent By:</span> {selected.sentBy}</div>
                                <div className="detail"><span>Gateway:</span> {selected.gateway}</div>
                                <div className="detail"><span>Retry Count:</span> {selected.retryCount}</div>
                            </div>
                            <div className="field">
                                <span>Message Content:</span>
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

export default SmsLogs


