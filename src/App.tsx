import { Routes, Route } from 'react-router-dom'

import { Admin, Home, ScreenPage } from './Pages'

function App() {
  return (
    <Routes>
      <Route path="app/:screenId/*" element={<ScreenPage />} />
      <Route path="home" element={<Home />} />
      <Route path="admin" element={<Admin />} />
      <Route index element={<ScreenPage />} />
    </Routes>
  )
}

export default App
