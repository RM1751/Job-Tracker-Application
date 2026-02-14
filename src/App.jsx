import { useState, useEffect } from 'react'
import './App.css'
import KanbanBoard from './components/KanbanBoard'
import StatsDashboard from './components/StatsDashboard'
import AddJobModal from './components/AddJobModal'

const STATUS_COLUMNS = [
  { id: 'saved', label: 'Saved', color: '#9ca3af' },
  { id: 'applied', label: 'Applied', color: '#3b82f6' },
  { id: 'phone_screen', label: 'Phone Screen', color: '#8b5cf6' },
  { id: 'technical', label: 'Technical Interview', color: '#f59e0b' },
  { id: 'final', label: 'Final Interview', color: '#ec4899' },
  { id: 'offer', label: 'Offer', color: '#10b981' },
  { id: 'rejected', label: 'Rejected', color: '#ef4444' },
  { id: 'withdrawn', label: 'Withdrawn', color: '#6b7280' }
]

const RESUME_OPTIONS = [
  'Software Engineer - General',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Data Engineer',
  'ML Engineer',
  'QA Engineer',
  'Custom Resume 1',
  'Custom Resume 2'
]

function App() {
  const [jobs, setJobs] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [activeTab, setActiveTab] = useState('board') // 'board' or 'stats'

  // Load jobs from localStorage on mount
  useEffect(() => {
    const savedJobs = localStorage.getItem('jobApplications')
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs))
    }
  }, [])

  // Save jobs to localStorage whenever jobs change
  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(jobs))
  }, [jobs])

  const handleAddJob = (jobData) => {
    const newJob = {
      id: Date.now().toString(),
      ...jobData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setJobs([...jobs, newJob])
    setShowAddModal(false)
  }

  const handleEditJob = (jobData) => {
    setJobs(jobs.map(job => 
      job.id === editingJob.id 
        ? { ...job, ...jobData, updatedAt: new Date().toISOString() }
        : job
    ))
    setEditingJob(null)
  }

  const handleDeleteJob = (jobId) => {
    if (confirm('Are you sure you want to delete this job application?')) {
      setJobs(jobs.filter(job => job.id !== jobId))
    }
  }

  const handleMoveJob = (jobId, newStatus) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { ...job, status: newStatus, updatedAt: new Date().toISOString() }
        : job
    ))
  }

  const openEditModal = (job) => {
    setEditingJob(job)
  }

  const exportData = () => {
    const dataStr = JSON.stringify(jobs, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `job-applications-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const importData = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedJobs = JSON.parse(e.target.result)
          if (Array.isArray(importedJobs)) {
            setJobs(importedJobs)
            alert('Data imported successfully!')
          } else {
            alert('Invalid file format!')
          }
        } catch (error) {
          alert('Error reading file!')
        }
      }
      reader.readAsText(file)
    }
    event.target.value = ''
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1>📋 Job Board Assistant By Ravi</h1>
          <p>Track your job application journey</p>
        </div>
        <div className="header-actions">
          <div className="tab-switcher">
            <button 
              className={activeTab === 'board' ? 'active' : ''}
              onClick={() => setActiveTab('board')}
            >
              📊 Board
            </button>
            <button 
              className={activeTab === 'stats' ? 'active' : ''}
              onClick={() => setActiveTab('stats')}
            >
              📈 Stats
            </button>
          </div>
          <button className="btn-export" onClick={exportData}>
            ⬇️ Export
          </button>
          <label className="btn-import">
            ⬆️ Import
            <input type="file" accept=".json" onChange={importData} hidden />
          </label>
          <button className="btn-add" onClick={() => setShowAddModal(true)}>
            ➕ Add Job
          </button>
        </div>
      </header>

      <main className="app-main">
        {activeTab === 'board' ? (
          <KanbanBoard 
            jobs={jobs}
            columns={STATUS_COLUMNS}
            onMoveJob={handleMoveJob}
            onEditJob={openEditModal}
            onDeleteJob={handleDeleteJob}
          />
        ) : (
          <StatsDashboard jobs={jobs} columns={STATUS_COLUMNS} />
        )}
      </main>

      {(showAddModal || editingJob) && (
        <AddJobModal
          job={editingJob}
          columns={STATUS_COLUMNS}
          resumeOptions={RESUME_OPTIONS}
          onSave={editingJob ? handleEditJob : handleAddJob}
          onClose={() => {
            setShowAddModal(false)
            setEditingJob(null)
          }}
        />
      )}
    </div>
  )
}

export default App
