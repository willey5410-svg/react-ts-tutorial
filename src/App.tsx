import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LessonPage } from './pages/LessonPage'

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lesson/:chapterId" element={<LessonPage />} />
      </Routes>
    </div>
  )
}

export default App
