import React, { useMemo, useState } from 'react'

const Acknowledgement = () => {
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [showFilters, setShowFilters] = useState(false)
    const [fIncident, setFIncident] = useState('')
    const [fAckId, setFAckId] = useState('')
    const [fDate, setFDate] = useState('')

    const rows = Array.from({ length: 7 }).map((_, idx) => ({
      ackId: String(456789123 + idx),
      incident: idx === 0 ? 'SAMPLE' : 'INC-30' + idx,
      guardian: 'Sean Creencia',
      guardianContact: '+63 912 345 6789',
      method: idx % 2 ? 'SMS Reply' : 'SMS',
      dateSent: idx === 0 ? 'Aug 12 2025, 12:12' : `Aug ${10+idx} 2025, 10:1${idx}`,
      dateAck: idx === 0 ? 'Aug 12 2025, 12:30' : `Aug ${10+idx} 2025, 10:3${idx}`,
      status: idx % 2 ? 'RECEIVED' : 'SENT',
      acknowledged: idx % 2 ? 'YES' : 'NO',
      content: "Received, I will talk to my child.",
      timestamp: `Aug ${10+idx} 2025, 10:2${idx}`,
    }))

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        return rows
            .filter(r => {
                if (!q) return true
                return (
                    r.incident.toLowerCase().includes(q) ||
                    r.ackId.toLowerCase().includes(q) ||
                    r.timestamp.toLowerCase().includes(q)
                )
            })
            .filter(r =>
                r.incident.toLowerCase().includes(fIncident.toLowerCase()) &&
                r.ackId.toLowerCase().includes(fAckId.toLowerCase()) &&
                r.timestamp.toLowerCase().includes(fDate.toLowerCase())
            )
    }, [query, fIncident, fAckId, fDate])

    const clearFilters = () => { setQuery(''); setFIncident(''); setFAckId(''); setFDate('') }

    return (
        <main className="content">

            <section className="panel">
                <h3>ACKNOWLEDGEMENT</h3>
                <div className="searchbar-row">
                    <input className="search-input" placeholder="Search by Incident # / Ack ID / Ack'd Date" value={query} onChange={e => setQuery(e.target.value)} />
                    <button className="btn small dark" type="button" onClick={() => setShowFilters(v => !v)}>{showFilters ? 'Hide Filters' : 'Filter'}</button>
                </div>
                {showFilters && (
                    <div className="filter-bar">
                        <div className="filters">
                            <div className="filter-field">
                                <input className="input-sm" placeholder="Incident #" value={fIncident} onChange={e => setFIncident(e.target.value)} />
                            </div>
                            <div className="filter-field">
                                <input className="input-sm" placeholder="Ack ID" value={fAckId} onChange={e => setFAckId(e.target.value)} />
                            </div>
                            <div className="filter-field">
                                <input className="input-sm" placeholder="Ack'd Date" value={fDate} onChange={e => setFDate(e.target.value)} />
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
                            <th>ACK ID</th>
                            <th>INCIDENT #</th>
                            <th>Guardian's Name</th>
                            <th>Acknowledged?</th>
                            <th>Method</th>
                            <th>Timestamp</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((r, i) => (
                            <tr key={i}>
                                <td>{r.ackId}</td>
                                <td>{r.incident}</td>
                                <td>{r.guardian}</td>
                                <td>{r.acknowledged}</td>
                                <td>{r.method}</td>
                                <td>{r.timestamp}</td>
                                <td><button className="btn small dark" onClick={() => { setSelected(r); setOpen(true) }}>View</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            {open && selected && (
                <div className="modal-overlay" onClick={() => setOpen(false)}>
                    <div className="modal" onClick={(e)=>e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>ACKNOWLEDGEMENT LOG DETAILS</h3>
                            <button className="icon-btn" onClick={() => setOpen(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="details">
                                <div className="detail"><span>Acknowledgement ID:</span> {selected.ackId}</div>
                                <div className="detail"><span>Incident #:</span> {selected.incident}</div>
                                <div className="detail"><span>Guardian's Name:</span> {selected.guardian}</div>
                                <div className="detail"><span>Guardian Contact:</span> {selected.guardianContact}</div>
                                <div className="detail"><span>Acknowledgement Type:</span> {selected.method}</div>
                                <div className="detail"><span>Date Sent to Guardian:</span> {selected.dateSent}</div>
                                <div className="detail"><span>Date Acknowledged:</span> {selected.dateAck}</div>
                                <div className="detail"><span>Acknowledged?</span> {selected.acknowledged}</div>
                            </div>
                            <div className="field">
                                <span>Acknowledgement Content:</span>
                                <textarea rows={4} readOnly value={selected.content} />
                            </div>
                            <div className="modal-footer">
                                <button className="btn secondary" onClick={()=> setOpen(false)}>Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Acknowledgement


