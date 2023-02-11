import { Routes, Route } from 'react-router-dom'

import { AdminPage, Home, ScreenPage } from './Pages'

function App() {
  return (
    <Routes>
      <Route index element={<ScreenPage />} />
      <Route path="home" element={<Home />} />
      <Route path="app/:screenId/*" element={<ScreenPage />} />
      <Route path="admin" element={<AdminPage />} />
      <Route path="admin/create" element={<AdminPage />} />
    </Routes>
  )
}

export default App
