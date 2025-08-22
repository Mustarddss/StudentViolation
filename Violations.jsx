import React, { useMemo, useState } from 'react'

const Violations = () => {
    const [query, setQuery] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [fIncidentId, setFIncidentId] = useState('')
    const [fStudentId, setFStudentId] = useState('')
    const [fName, setFName] = useState('')
    const rows = Array.from({ length: 7 }).map((_, idx) => ({
        studentName: 'MARIA MAGDALENE',
        studentId: '2023-17011' + idx,
        incidentId: '1234567891' + idx,
        violationType: idx % 2 ? 'TARDINESS' : 'NO UNIFORM',
        date: '08-1' + (idx + 1) + '-2025',
        time: `6:0${idx}am`,
        severity: idx % 2 ? 'MINOR' : 'MAJOR',
        status: idx % 3 ? 'PENDING' : 'NOTIFIED',
        reportedBy: 'Irish Mahagis',
        evidenceStatus: idx % 2 ? 'Pending' : 'Uploaded',
        notes: 'yung anak mo walang kwenta lagi naka revealing na damit'
    }))

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        return rows
            .filter(r => {
                if (!q) return true
                return (
                    r.incidentId.toLowerCase().includes(q) ||
                    r.studentId.toLowerCase().includes(q) ||
                    r.studentName.toLowerCase().includes(q)
                )
            })
            .filter(r =>
                r.incidentId.toLowerCase().includes(fIncidentId.toLowerCase()) &&
                r.studentId.toLowerCase().includes(fStudentId.toLowerCase()) &&
                r.studentName.toLowerCase().includes(fName.toLowerCase())
            )
    }, [query, fIncidentId, fStudentId, fName])

    const clearFilters = () => { setQuery(''); setFIncidentId(''); setFStudentId(''); setFName('') }

    const [open, setOpen] = useState(false)
    const [openView, setOpenView] = useState(false)
    const [selected, setSelected] = useState(null)
    const STUDENTS = [
        { id: '2024-0001', name: 'MARIA MAGDALENE', program: 'BSIT', yearLevel: '3' },
        { id: '2024-0002', name: 'JUAN DELA CRUZ', program: 'BSBA', yearLevel: '2' },
        { id: '2024-0003', name: 'ANA SANTOS', program: 'BSCpE', yearLevel: '1' },
    ]

    const [form, setForm] = useState({
        studentId: '',
        name: '',
        program: '',
        yearLevel: '',
        violationType: '',
        severity: '',
        status: '',
        dateTime: '',
        reportedBy: '',
        description: '',
        evidenceName: '',
        sendEmail: 'Send email',
    })

    const update = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }))
    const handleStudentIdChange = (e) => {
        const value = e.target.value
        const match = STUDENTS.find(s => s.id.toLowerCase() === value.toLowerCase())
        setForm(prev => ({
            ...prev,
            studentId: value,
            name: match?.name || '',
            program: match?.program || '',
            yearLevel: match?.yearLevel || '',
        }))
    }
    const handleSave = () => {
        // demo-only: close modal
        setOpen(false)
    }

    return (
        <main className="content">
            

            <section className="panel">
                <div className="panel-header">
                    <h3>RECENT VIOLATION</h3>
                    <button className="btn add-new" onClick={() => setOpen(true)}>ADD NEW</button>
                </div>
                <div className="searchbar-row">
                    <input className="search-input" placeholder="Search by Incident ID / Student ID / Student's Name" value={query} onChange={e => setQuery(e.target.value)} />
                    <button className="btn small dark" type="button" onClick={() => setShowFilters(v => !v)}>{showFilters ? 'Hide Filters' : 'Filter'}</button>
                </div>
                {showFilters && (
                    <div className="filter-bar">
                        <div className="filters">
                            <div className="filter-field">
                                <input className="input-sm" placeholder="Incident ID" value={fIncidentId} onChange={e => setFIncidentId(e.target.value)} />
                            </div>
                            <div className="filter-field">
                                <input className="input-sm" placeholder="Student ID" value={fStudentId} onChange={e => setFStudentId(e.target.value)} />
                            </div>
                            <div className="filter-field">
                                <input className="input-sm" placeholder="Student Name" value={fName} onChange={e => setFName(e.target.value)} />
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
                            <th>STUDENT NAME</th>
                            <th>Student ID</th>
                            <th>Incident ID</th>
                            <th>Violation Type</th>
                            <th>DATE</th>
                            <th>SEVERITY</th>
                            <th>STATUS</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((r, i) => (
                            <tr key={i}>
                                <td>{r.studentName}</td>
                                <td>{r.studentId}</td>
                                <td>{r.incidentId}</td>
                                <td>{r.violationType}</td>
                                <td>{r.date}</td>
                                <td className={r.severity === 'MINOR' ? 'severity-minor' : 'severity-major'}>{r.severity}</td>
                                <td className={r.status === 'PENDING' ? 'status-pending' : 'status-notified'}>{r.status}</td>
                                <td><button className="btn small dark" onClick={() => { setSelected(r); setOpenView(true) }}>View</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            {openView && selected && (
                <div className="modal-overlay" onClick={() => setOpenView(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>RECENT VIOLATION INFORMATION</h3>
                            <div style={{display:'flex', gap:8, alignItems:'center'}}>
                                <button className="btn small secondary" onClick={() => setOpenView(false)}>Cancel</button>
                                <button className="icon-btn" onClick={() => setOpenView(false)}>×</button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="grid-two">
                                <label className="field">
                                    <span>Student ID</span>
                                    <input readOnly value={selected.studentId} />
                                </label>
                                <label className="field">
                                    <span>Date</span>
                                    <input readOnly value={selected.date} />
                                </label>
                                <label className="field">
                                    <span>Violation Type</span>
                                    <input readOnly value={selected.violationType} />
                                </label>
                                <label className="field">
                                    <span>Time</span>
                                    <input readOnly value={selected.time} />
                                </label>
                                <label className="field">
                                    <span>Severity</span>
                                    <input readOnly value={selected.severity} />
                                </label>
                                <label className="field">
                                    <span>Status</span>
                                    <select value={selected.status} onChange={(e)=> setSelected(prev => ({...prev, status:e.target.value}))}>
                                        <option>PENDING</option>
                                        <option>NOTIFIED</option>
                                    </select>
                                </label>
                                <label className="field">
                                    <span>Reported By...</span>
                                    <input readOnly value={selected.reportedBy} />
                                </label>
                                <label className="field">
                                    <span>Upload Evidence</span>
                                    <div style={{display:'flex', gap:8}}>
                                        <input readOnly value={selected.evidenceStatus} />
                                        <button className="btn small secondary">View</button>
                                    </div>
                                </label>
                            </div>
                            <label className="field">
                                <span>Notes</span>
                                <textarea rows={6} value={selected.notes} onChange={(e)=> setSelected(prev=> ({...prev, notes:e.target.value}))} />
                            </label>
                            <div className="modal-footer">
                                <button className="btn secondary">Send SMS</button>
                                <button className="btn danger">Remove</button>
                                <button className="btn primary" onClick={()=> setOpenView(false)}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {open && (
                <div className="modal-overlay" onClick={() => setOpen(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>ADD NEW VIOLATION</h3>
                            <button className="icon-btn" onClick={() => setOpen(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="grid-two">
                                <label className="field">
                                    <span>Student ID <b>*</b></span>
                                    <input value={form.studentId} onChange={handleStudentIdChange} placeholder="Enter Student ID" />
                                </label>
                                <label className="field">
                                    <span>Name</span>
                                    <input value={form.name} readOnly placeholder="Auto-filled" />
                                </label>
                                <label className="field">
                                    <span>Program</span>
                                    <input value={form.program} readOnly placeholder="Auto-filled" />
                                </label>
                                <label className="field">
                                    <span>Yr Level</span>
                                    <input value={form.yearLevel} readOnly placeholder="Auto-filled" />
                                </label>
                                <label className="field">
                                    <span>Violation Type <b>*</b></span>
                                    <select value={form.violationType} onChange={update('violationType')}>
                                        <option value="">Select violation</option>
                                        <option>DRESS CODE</option>
                                        <option>TARDINESS</option>
                                    </select>
                                </label>
                                <label className="field">
                                    <span>Severity <b>*</b></span>
                                    <select value={form.severity} onChange={update('severity')}>
                                        <option value="">Select severity</option>
                                        <option>MINOR</option>
                                        <option>MAJOR</option>
                                    </select>
                                </label>
                                <label className="field">
                                    <span>Status</span>
                                    <select value={form.status} onChange={update('status')}>
                                        <option value="">Select status</option>
                                        <option>PENDING</option>
                                        <option>NOTIFIED</option>
                                    </select>
                                </label>
                                <label className="field">
                                    <span>Date & Time</span>
                                    <input type="datetime-local" value={form.dateTime} onChange={update('dateTime')} />
                                </label>
                                <label className="field">
                                    <span>Reported By</span>
                                    <input placeholder="Reported by" value={form.reportedBy} onChange={update('reportedBy')} />
                                </label>
                            </div>
                            <label className="field">
                                <span>Description</span>
                                <textarea rows={6} value={form.description} onChange={update('description')} />
                            </label>
                            <label className="field">
                                <span>Upload Evidence (optional)</span>
                                <input type="file" accept="image/*,.pdf" onChange={(e)=> setForm(prev => ({...prev, evidenceName: e.target.files?.[0]?.name || ''}))} />
                                {form.evidenceName && <small>Selected: {form.evidenceName}</small>}
                            </label>
                            <div className="modal-footer">
                                <select className="select-sm" value={form.sendEmail} onChange={update('sendEmail')}>
                                    <option>Send email</option>
                                    <option>Do not send</option>
                                </select>
                                <button className="btn primary" onClick={handleSave}>Save & Notify</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Violations


