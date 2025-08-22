import React from 'react'

const Home = () => {
    return (
        <main className="content">

            <div className="stats-row">
                <div className="stat-card">
                    <div className="stat-num">12</div>
                    <div className="stat-label">TOTAL STUDENTS VIOLATION</div>
                </div>
                <div className="stat-card">
                    <div className="stat-num">5</div>
                    <div className="stat-label">PENDING ACKNOWLEDGE</div>
                </div>
                <div className="stat-card">
                    <div className="stat-num">3</div>
                    <div className="stat-label">APPOINTMENTS THIS WEEK</div>
                </div>
            </div>

            <div className="grid-2">
                <section className="panel recent">
                    <h3>RECENT VIOLATION</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>STUDENT</th>
                                <th>DATE</th>
                                <th>SEVERITY</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 7 }).map((_, idx) => (
                                <tr key={idx}>
                                    <td>MARIA MAGDALENE</td>
                                    <td>AUG 10</td>
                                    <td>{idx % 2 ? 'MINOR' : 'MAJOR'}</td>
                                    <td>{idx % 3 ? 'PENDING' : 'NOTIFIED'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <div className="right-col">
                    <section className="panel donut-panel">
                        <h3>VIOLATION SEVERITY</h3>
                        <div className="legend">
                            <div className="legend-item"><span className="dot minor" />MINOR</div>
                            <div className="legend-item"><span className="dot major" />MAJOR</div>
                        </div>
                        <div className="donut">
                            <div className="donut-hole" />
                        </div>
                    </section>

                    <section className="panel bar-panel">
                        <h3>VIOLATION BY MONTH</h3>
                        <div className="bars">
                            <div className="bar" style={{ height: 60 }} />
                            <div className="bar" style={{ height: 25 }} />
                            <div className="bar" style={{ height: 120 }} />
                        </div>
                        <div className="bar-labels">
                            <span>JAN</span>
                            <span>FEB</span>
                            <span>MARCH</span>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default Home


