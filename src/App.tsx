import { Routes, Route } from 'react-router-dom'

import { Admin, Home, ScreenPage } from './Pages'

function App() {
  return (
    <Routes>
      <Route path="screen" element={<ScreenPage />} />
      <Route index element={<Home />} />
      <Route path="admin" element={<Admin />} />
      <Route element={<ScreenPage />} />
    </Routes>
  )
}

export default App
