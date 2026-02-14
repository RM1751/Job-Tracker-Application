import { useState, useEffect } from 'react'

function AddJobModal({ job, columns, resumeOptions, onSave, onClose }) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    jobUrl: '',
    salary: '',
    status: 'saved',
    appliedDate: new Date().toISOString().split('T')[0],
    resumeUsed: '',
    notes: ''
  })

  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company || '',
        position: job.position || '',
        location: job.location || '',
        jobUrl: job.jobUrl || '',
        salary: job.salary || '',
        status: job.status || 'saved',
        appliedDate: job.appliedDate ? job.appliedDate.split('T')[0] : new Date().toISOString().split('T')[0],
        resumeUsed: job.resumeUsed || '',
        notes: job.notes || ''
      })
    }
  }, [job])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        <div className="modal-header">
          <h2>{job ? '✏️ Edit Job Application' : '➕ Add New Job Application'}</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="company">Company Name *</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g., Google, Microsoft, Amazon"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position/Role *</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g., Senior Software Engineer"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Remote, New York, London"
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobUrl">Job Posting URL</label>
              <input
                type="url"
                id="jobUrl"
                name="jobUrl"
                value={formData.jobUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary Range</label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., $100k - $150k"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                {columns.map(col => (
                  <option key={col.id} value={col.id}>{col.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="appliedDate">Date Applied</label>
              <input
                type="date"
                id="appliedDate"
                name="appliedDate"
                value={formData.appliedDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="resumeUsed">Resume Used *</label>
              <select
                id="resumeUsed"
                name="resumeUsed"
                value={formData.resumeUsed}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Resume --</option>
                {resumeOptions.map(resume => (
                  <option key={resume} value={resume}>{resume}</option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any notes about this application, recruiter contacts, interview details, etc."
              rows={4}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              {job ? 'Save Changes' : 'Add Job Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddJobModal
