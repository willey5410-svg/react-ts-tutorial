import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LessonPage } from './pages/LessonPage'
import { ThemeToggle } from './components/ThemeToggle'

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto flex max-w-3xl justify-end px-4 pt-4">
        <ThemeToggle />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lesson/:chapterId" element={<LessonPage />} />
      </Routes>
    </div>
  )
}

export default App
