import React, { useMemo, useState } from 'react'

const Appointments = () => {
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [showFilters, setShowFilters] = useState(false)
    const [fIncident, setFIncident] = useState('')
    const [fApt, setFApt] = useState('')
    const [fDate, setFDate] = useState('')

    const rows = Array.from({ length: 7 }).map((_, idx) => ({
        ackId: 'A' + (1000 + idx),
        appointmentId: 100 + idx,
        incidentId: 'INC-40' + idx,
        appointmentNo: 'APT-' + (123456 + idx),
        student: 'Juan Dela Cruz',
        guardian: 'Sean Creencia',
        guardianContact: '+63 912 345 6789',
        purpose: 'Violation Discussion',
        requestedBy: 'Teacher Maria Santos',
        assignedTo: idx % 2 ? 'Dean Office' : 'Guidance Office',
        dateTime: 'Aug 20, 2025 – 2:0' + idx + ' PM',
        meetLink: 'https://meet.google.com/abc-defg-hij',
        status: idx % 3 === 1 ? 'UPCOMING' : 'DONE',
        notes: ''
    }))

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        return rows
            .filter(r => {
                if (!q) return true
                return (
                    r.incidentId.toLowerCase().includes(q) ||
                    r.appointmentNo.toLowerCase().includes(q) ||
                    r.dateTime.toLowerCase().includes(q)
                )
            })
            .filter(r =>
                r.incidentId.toLowerCase().includes(fIncident.toLowerCase()) &&
                r.appointmentNo.toLowerCase().includes(fApt.toLowerCase()) &&
                r.dateTime.toLowerCase().includes(fDate.toLowerCase())
            )
    }, [query, fIncident, fApt, fDate])

    const clearFilters = () => { setQuery(''); setFIncident(''); setFApt(''); setFDate('') }

    return (
        <main className="content">

            <section className="panel">
                <div className="panel-header">
                    <h3>APPOINTMENTS</h3>
                    <button className="btn add-new">ADD NEW</button>
                </div>
                <div className="searchbar-row">
                    <input className="search-input" placeholder="Search by Incident # / Appointment # / Appointment Date" value={query} onChange={e => setQuery(e.target.value)} />
                    <button className="btn small dark" type="button" onClick={() => setShowFilters(v => !v)}>{showFilters ? 'Hide Filters' : 'Filter'}</button>
                </div>
                {showFilters && (
                    <div className="filter-bar">
                        <div className="filters">
                            <div className="filter-field">
                                <input className="input-sm" placeholder="Incident #" value={fIncident} onChange={e => setFIncident(e.target.value)} />
                            </div>
                            <div className="filter-field">
                                <input className="input-sm" placeholder="Appointment #" value={fApt} onChange={e => setFApt(e.target.value)} />
                            </div>
                            <div className="filter-field">
                                <input className="input-sm" placeholder="Appointment Date" value={fDate} onChange={e => setFDate(e.target.value)} />
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
                            <th>Ack ID</th>
                            <th>Incident #</th>
                            <th>APPOINTMENT #</th>
                            <th>Assigned To</th>
                            <th>Guardian's Name</th>
                            <th>DATE & TIME</th>
                            <th>MEET LINK</th>
                            <th>STATUS</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((r, i) => (
                            <tr key={i}>
                                <td>{r.ackId}</td>
                                <td>{r.incidentId}</td>
                                <td>{r.appointmentNo}</td>
                                <td>{r.assignedTo}</td>
                                <td>{r.guardian}</td>
                                <td>{r.dateTime}</td>
                                <td><a href={r.meetLink} target="_blank" rel="noreferrer">{r.meetLink}</a></td>
                                <td>
                                    <span className={r.status === 'DONE' ? 'status-chip done' : r.status === 'UPCOMING' ? 'status-chip upcoming' : 'status-chip pending'}>
                                        {r.status}
                                    </span>
                                </td>
                                <td><button className="btn small dark" onClick={() => { setSelected(r); setOpen(true) }}>View / Update</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            {open && selected && (
                <div className="modal-overlay" onClick={() => setOpen(false)}>
                    <div className="modal" onClick={e=>e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>APPOINTMENT DETAILS</h3>
                            <button className="icon-btn" onClick={() => setOpen(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="details">
                                <div className="detail"><span>Appointment ID:</span> {selected.appointmentId}</div>
                                <div className="detail"><span>Student:</span> {selected.student}</div>
                                <div className="detail"><span>Guardian:</span> {selected.guardian}</div>
                                <div className="detail"><span>Guardian Contact:</span> {selected.guardianContact}</div>
                                <div className="detail"><span>Purpose:</span> {selected.purpose}</div>
                                <div className="detail"><span>Requested By:</span> {selected.requestedBy}</div>
                                <div className="detail"><span>Requested Date & Time:</span> {selected.dateTime}</div>
                            </div>
                            <div className="grid-two">
                                <label className="field">
                                    <span>Assigned</span>
                                    <input value={selected.assignedTo} onChange={e => setSelected(prev => ({ ...prev, assignedTo: e.target.value }))} />
                                </label>
                                <label className="field">
                                    <span>Status</span>
                                    <select value={selected.status} onChange={e => setSelected(prev => ({ ...prev, status: e.target.value }))}>
                                        <option value="PENDING">PENDING</option>
                                        <option value="UPCOMING">UPCOMING</option>
                                        <option value="DONE">DONE</option>
                                        <option value="RESCHEDULED">RESCHEDULED</option>
                                    </select>
                                </label>
                            </div>
                            <label className="field">
                                <span>Notes</span>
                                <textarea rows={6} placeholder="Type here..." value={selected.notes} onChange={e => setSelected(prev => ({ ...prev, notes: e.target.value }))} />
                            </label>
                            <div className="modal-footer">
                                <button className="btn primary" onClick={() => setOpen(false)}>Save Changes</button>
                                <button className="btn secondary" onClick={() => setOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Appointments


