import JobCard from './JobCard'

function KanbanBoard({ jobs, columns, onMoveJob, onEditJob, onDeleteJob }) {
  const getJobsByStatus = (status) => {
    return jobs.filter(job => job.status === status)
  }

  const handleDragStart = (e, jobId) => {
    e.dataTransfer.setData('jobId', jobId)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, status) => {
    e.preventDefault()
    const jobId = e.dataTransfer.getData('jobId')
    if (jobId) {
      onMoveJob(jobId, status)
    }
  }

  return (
    <div className="kanban-board">
      {columns.map(column => {
        const columnJobs = getJobsByStatus(column.id)
        return (
          <div 
            key={column.id}
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="column-header" style={{ borderTopColor: column.color }}>
              <span className="column-dot" style={{ backgroundColor: column.color }}></span>
              <h3>{column.label}</h3>
              <span className="column-count">{columnJobs.length}</span>
            </div>
            <div className="column-content">
              {columnJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  columnColor={column.color}
                  onDragStart={handleDragStart}
                  onEdit={() => onEditJob(job)}
                  onDelete={() => onDeleteJob(job.id)}
                />
              ))}
              {columnJobs.length === 0 && (
                <div className="empty-column">
                  <p>Drop jobs here</p>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default KanbanBoard
