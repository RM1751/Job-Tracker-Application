function JobCard({ job, columnColor, onDragStart, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getDaysSince = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`
  }

  return (
    <div
      className="job-card"
      draggable
      onDragStart={(e) => onDragStart(e, job.id)}
      style={{ borderLeftColor: columnColor }}
    >
      <div className="job-card-header">
        <h4 className="job-company">{job.company}</h4>
        <div className="job-actions">
          <button className="btn-icon" onClick={onEdit} title="Edit">✏️</button>
          <button className="btn-icon" onClick={onDelete} title="Delete">🗑️</button>
        </div>
      </div>
      
      <p className="job-position">{job.position}</p>
      
      {job.location && (
        <p className="job-location">📍 {job.location}</p>
      )}
      
      <div className="job-meta">
        <span className="job-date" title={formatDate(job.appliedDate)}>
          📅 {getDaysSince(job.appliedDate)}
        </span>
        {job.salary && (
          <span className="job-salary">💰 {job.salary}</span>
        )}
      </div>
      
      {job.resumeUsed && (
        <div className="job-resume">
          <span className="resume-label">📄 Resume:</span>
          <span className="resume-name">{job.resumeUsed}</span>
        </div>
      )}
      
      {job.jobUrl && (
        <a 
          href={job.jobUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="job-link"
        >
          🔗 View Job Posting
        </a>
      )}
      
      {job.notes && (
        <div className="job-notes">
          <p>{job.notes}</p>
        </div>
      )}
    </div>
  )
}

export default JobCard
