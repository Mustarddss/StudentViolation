import React, { useMemo, useState } from 'react'

const MOCK_STUDENTS = [
    { id: '2024-0001', name: 'MARIA MAGDALENE', program: 'BSIT', year: '3', gender: 'F', guardian: 'JOSEPHINE MAGDALENE', contact: '+63 900 123 4567', email: 'guardian@example.com' },
    { id: '2024-0002', name: 'JUAN DELA CRUZ', program: 'BSBA', year: '2', gender: 'M', guardian: 'PEDRO CRUZ', contact: '+63 900 333 1111', email: 'pedro@example.com' },
    { id: '2024-0003', name: 'ANA SANTOS', program: 'BSIT', year: '1', gender: 'F', guardian: 'MARIA SANTOS', contact: '+63 900 555 2222', email: 'maria@example.com' },
    { id: '2024-0004', name: 'MARK REYES', program: 'BSCpE', year: '4', gender: 'M', guardian: 'JUAN REYES', contact: '+63 900 777 3333', email: 'juan@example.com' },
    { id: '2024-0005', name: 'LIZA TAN', program: 'BSN', year: '2', gender: 'F', guardian: 'LEO TAN', contact: '+63 900 444 8888', email: 'leo@example.com' },
    { id: '2024-0006', name: 'CARLO LIM', program: 'BSIT', year: '3', gender: 'M', guardian: 'CARMEN LIM', contact: '+63 900 999 4444', email: 'carmen@example.com' },
    { id: '2024-0007', name: 'ROSE MENDOZA', program: 'BSBA', year: '1', gender: 'F', guardian: 'RAFAEL MENDOZA', contact: '+63 900 121 2121', email: 'rafael@example.com' },
]

const StudentInfo = () => {
    const [studentId, setStudentId] = useState('')
    const [program, setProgram] = useState('')
    const [name, setName] = useState('')
    const [query, setQuery] = useState('')
    const [showFilters, setShowFilters] = useState(false)

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        return MOCK_STUDENTS
            .filter(s => {
                if (!q) return true
                const target = `${s.id} ${s.program} ${s.name}`.toLowerCase()
                return target.includes(q)
            })
            .filter(s =>
                s.id.toLowerCase().includes(studentId.toLowerCase()) &&
                s.program.toLowerCase().includes(program.toLowerCase()) &&
                s.name.toLowerCase().includes(name.toLowerCase())
            )
    }, [query, studentId, program, name])

    const clearFilters = () => { setStudentId(''); setProgram(''); setName(''); setQuery('') }

    return (
        <main className="content">
            <section className="panel student-panel">
                <h3>STUDENT INFORMATION</h3>
                <div className="searchbar-row">
                    <input className="search-input" placeholder="Search by Student ID / Program / Name" value={query} onChange={e => setQuery(e.target.value)} />
                    <button className="btn small dark" type="button" onClick={() => setShowFilters(v => !v)}>{showFilters ? 'Hide Filters' : 'Filter'}</button>
                </div>
                {showFilters && (
                <div className="filter-bar">
                    <div className="filters">
                        <div className="filter-field">
                            <input className="input-sm" placeholder="Student ID" value={studentId} onChange={e => setStudentId(e.target.value)} />
                        </div>
                        <div className="filter-field">
                            <input className="input-sm" placeholder="Program" value={program} onChange={e => setProgram(e.target.value)} />
                        </div>
                        <div className="filter-field">
                            <input className="input-sm" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="filter-actions">
                            <button className="btn small secondary" type="button" onClick={() => { /* live filter */ }}>Filter</button>
                            <button className="btn small dark" type="button" onClick={clearFilters}>Clear</button>
                        </div>
                    </div>
                </div>
                )}
                <table className="table">
                    <thead>
                        <tr>
                            <th>STUDENT ID</th>
                            <th>NAME</th>
                            <th>PROGRAM</th>
                            <th>YR LEVEL</th>
                            <th>GENDER</th>
                            <th>GUARDIAN'S NAME</th>
                            <th>GUARDIAN'S CONTACT NUMBER</th>
                            <th>GUARDIAN'S EMAIL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((s) => (
                            <tr key={s.id}>
                                <td>{s.id}</td>
                                <td>{s.name}</td>
                                <td>{s.program}</td>
                                <td>{s.year}</td>
                                <td>{s.gender}</td>
                                <td>{s.guardian}</td>
                                <td>{s.contact}</td>
                                <td>{s.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default StudentInfo


