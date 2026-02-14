# 📋 Job Board Assistant By Ravi

A simple, beautiful Kanban-style job application tracker that runs locally in your browser. Track your job search journey, monitor which resume you used for each application, and view detailed statistics about your progress.

![Job Board Assistant](screenshot.png)

## ✨ Features

- **📊 Kanban Board** - Drag and drop jobs through different stages:
  - Saved
  - Applied
  - Phone Screen
  - Technical Interview
  - Final Interview
  - Offer
  - Rejected
  - Withdrawn

- **📝 Track Job Details**:
  - Company name
  - Position/Role
  - Location
  - Job posting URL
  - Salary range
  - Date applied
  - **Resume used** (so you know which resume got you the interview!)
  - Notes

- **📈 Statistics Dashboard**:
  - Total applications
  - Interview count
  - Offers received
  - Response rate
  - Success rate
  - Resume performance (which resume works best)
  - Weekly/Monthly activity

- **💾 Data Persistence**:
  - All data saved to browser's localStorage
  - Export data as JSON file
  - Import data from JSON file

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Navigate to the project directory
cd job-board-assistant

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will open at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 📖 How to Use

1. **Add a Job**: Click the "➕ Add Job" button and fill in the details. Don't forget to select which resume you used!

2. **Move Jobs**: Drag and drop job cards between columns as they progress through the hiring process.

3. **Edit/Delete**: Click ✏️ to edit a job or 🗑️ to delete it.

4. **View Stats**: Click "📈 Stats" tab to see your job search analytics.

5. **Export/Import**: Use Export/Import buttons to backup or restore your data.

## 🎨 Resume Tracking

One of the key features is tracking which resume you used for each application. The app comes with pre-defined resume options:
- Software Engineer - General
- Frontend Developer
- Backend Developer
- Full Stack Developer
- DevOps Engineer
- Data Engineer
- ML Engineer
- QA Engineer
- Custom Resume 1 & 2

You can easily modify these in `src/App.jsx` to match your own resume variations.

## 🛠️ Customization

### Change Resume Options
Edit `RESUME_OPTIONS` array in `src/App.jsx`:

```javascript
const RESUME_OPTIONS = [
  'Your Resume 1',
  'Your Resume 2',
  // ... add more
]
```

### Change Status Columns
Edit `STATUS_COLUMNS` array in `src/App.jsx`:

```javascript
const STATUS_COLUMNS = [
  { id: 'saved', label: 'Saved', color: '#9ca3af' },
  // ... modify as needed
]
```

## 📁 Project Structure

```
job-board-assistant/
├── src/
│   ├── components/
│   │   ├── KanbanBoard.jsx    # Kanban board with drag-drop
│   │   ├── JobCard.jsx        # Individual job card
│   │   ├── AddJobModal.jsx    # Add/Edit job form
│   │   └── StatsDashboard.jsx # Statistics dashboard
│   ├── App.jsx                # Main app component
│   ├── App.css                # Styles
│   └── main.jsx               # Entry point
├── index.html
└── package.json
```

## 🌐 Data Storage

All your data is stored in your browser's localStorage. To ensure you don't lose your data:
- Regularly export your data using the "⬇️ Export" button
- The exported JSON file can be imported back using the "⬆️ Import" button

## 📄 License

MIT License - feel free to use and modify as needed!

---

Good luck with your job search! 🚀
