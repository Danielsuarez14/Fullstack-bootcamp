import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Create from './pages/Create.jsx'
import PageNotFound from './pages/PageNotFound.jsx'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
