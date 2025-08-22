import React from 'react'

const Reports = () => {
    const rows = Array.from({ length: 6 }).map((_, idx) => ({
        violationNo: '878787',
        studentName: '—',
        violationType: '—',
        date: '—',
        severity: '—',
        acknowledge: '—',
        program: '—',
    }))

    return (
        <main className="content">

            <section className="panel">
                <div className="panel-header">
                    <h3>REPORTS</h3>
                    <div className="panel-actions">
                        <button className="btn small secondary">Download Excel</button>
                        <button className="btn small secondary">Download PDF</button>
                        <button className="btn small dark">FILTER</button>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Violation#</th>
                            <th>Student Name</th>
                            <th>Violation Type</th>
                            <th>Date</th>
                            <th>Severity</th>
                            <th>Acknowledge</th>
                            <th>Program</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r, i) => (
                            <tr key={i}>
                                <td>{r.violationNo}</td>
                                <td>{r.studentName}</td>
                                <td>{r.violationType}</td>
                                <td>{r.date}</td>
                                <td>{r.severity}</td>
                                <td>{r.acknowledge}</td>
                                <td>{r.program}</td>
                                <td><button className="btn small dark">View all</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default Reports


