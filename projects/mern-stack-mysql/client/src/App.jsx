import { Route, Routes } from "react-router-dom"
import TasksPage from './pages/TasksPage.jsx'
import TaskForm from './pages/TaskForm.jsx'
import NotFound from "./pages/NotFound.jsx"
import Navbar from "./components/Navbar.jsx"
import { TaskContextProvider } from "./context/TaskContext.jsx"

function App() {
  return (
    <div className="bg-zinc-900 h-screen">
      <Navbar />
      <div className="container mx-auto py-4 px-2">
        <TaskContextProvider>
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path='/new' element={<TaskForm />} />
            <Route path='/edit/:id' element={<TaskForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TaskContextProvider>
      </div>
    </div>
  )
}

export default App
