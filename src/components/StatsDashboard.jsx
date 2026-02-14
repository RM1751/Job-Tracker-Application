import { useMemo } from 'react'

function StatsDashboard({ jobs, columns }) {
  const stats = useMemo(() => {
    const total = jobs.length
    const byStatus = {}
    columns.forEach(col => {
      byStatus[col.id] = jobs.filter(job => job.status === col.id).length
    })

    const interviews = byStatus.phone_screen + byStatus.technical + byStatus.final
    const offers = byStatus.offer
    const rejected = byStatus.rejected
    const active = total - rejected - byStatus.withdrawn

    const responseRate = total > 0 ? ((interviews + offers + rejected) / total * 100).toFixed(1) : 0
    const successRate = interviews > 0 ? (offers / interviews * 100).toFixed(1) : 0

    // Jobs by resume
    const byResume = {}
    jobs.forEach(job => {
      if (job.resumeUsed) {
        byResume[job.resumeUsed] = (byResume[job.resumeUsed] || 0) + 1
      }
    })

    // Jobs this week
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    const thisWeek = jobs.filter(job => new Date(job.createdAt) > oneWeekAgo).length

    // Jobs this month
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    const thisMonth = jobs.filter(job => new Date(job.createdAt) > oneMonthAgo).length

    return {
      total,
      byStatus,
      interviews,
      offers,
      rejected,
      active,
      responseRate,
      successRate,
      byResume,
      thisWeek,
      thisMonth
    }
  }, [jobs, columns])

  const getResumeSuccess = (resumeName) => {
    const resumeJobs = jobs.filter(job => job.resumeUsed === resumeName)
    const interviews = resumeJobs.filter(job => 
      ['phone_screen', 'technical', 'final', 'offer'].includes(job.status)
    ).length
    const offers = resumeJobs.filter(job => job.status === 'offer').length
    return { total: resumeJobs.length, interviews, offers }
  }

  return (
    <div className="stats-dashboard">
      <div className="stats-grid">
        {/* Key Metrics */}
        <div className="stat-card primary">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>Total Applications</h3>
            <p className="stat-value">{stats.total}</p>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>Interviews</h3>
            <p className="stat-value">{stats.interviews}</p>
          </div>
        </div>

        <div className="stat-card gold">
          <div className="stat-icon">🏆</div>
          <div className="stat-info">
            <h3>Offers</h3>
            <p className="stat-value">{stats.offers}</p>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Response Rate</h3>
            <p className="stat-value">{stats.responseRate}%</p>
          </div>
        </div>

        <div className="stat-card purple">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3>Success Rate</h3>
            <p className="stat-value">{stats.successRate}%</p>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>This Week</h3>
            <p className="stat-value">{stats.thisWeek}</p>
          </div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="stats-section">
        <h3>📊 Application Status Breakdown</h3>
        <div className="status-bars">
          {columns.map(col => {
            const count = stats.byStatus[col.id] || 0
            const percentage = stats.total > 0 ? (count / stats.total * 100).toFixed(1) : 0
            return (
              <div key={col.id} className="status-bar-item">
                <div className="status-bar-header">
                  <span className="status-label">
                    <span className="status-dot" style={{ backgroundColor: col.color }}></span>
                    {col.label}
                  </span>
                  <span className="status-count">{count} ({percentage}%)</span>
                </div>
                <div className="status-bar-bg">
                  <div 
                    className="status-bar-fill" 
                    style={{ width: `${percentage}%`, backgroundColor: col.color }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Resume Performance */}
      {Object.keys(stats.byResume).length > 0 && (
        <div className="stats-section">
          <h3>📄 Resume Performance</h3>
          <div className="resume-table-container">
            <table className="resume-table">
              <thead>
                <tr>
                  <th>Resume</th>
                  <th>Applications</th>
                  <th>Interviews</th>
                  <th>Offers</th>
                  <th>Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stats.byResume)
                  .sort((a, b) => b[1] - a[1])
                  .map(([resume, count]) => {
                    const perf = getResumeSuccess(resume)
                    const rate = perf.interviews > 0 ? (perf.offers / perf.interviews * 100).toFixed(1) : 0
                    return (
                      <tr key={resume}>
                        <td>{resume}</td>
                        <td>{perf.total}</td>
                        <td>{perf.interviews}</td>
                        <td>{perf.offers}</td>
                        <td>
                          <span className={`rate-badge ${rate >= 50 ? 'high' : rate >= 20 ? 'medium' : 'low'}`}>
                            {rate}%
                          </span>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Activity Summary */}
      <div className="stats-section">
        <h3>📈 Activity Summary</h3>
        <div className="activity-grid">
          <div className="activity-item">
            <span className="activity-label">Active Applications</span>
            <span className="activity-value">{stats.active}</span>
          </div>
          <div className="activity-item">
            <span className="activity-label">Rejected</span>
            <span className="activity-value">{stats.rejected}</span>
          </div>
          <div className="activity-item">
            <span className="activity-label">This Month</span>
            <span className="activity-value">{stats.thisMonth}</span>
          </div>
          <div className="activity-item">
            <span className="activity-label">Interview Rate</span>
            <span className="activity-value">
              {stats.total > 0 ? (stats.interviews / stats.total * 100).toFixed(1) : 0}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsDashboard
