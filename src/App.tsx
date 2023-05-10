import { Routes, Route } from 'react-router-dom'

import { LoginPage } from 'Pages/LoginPage'

import {
  AdminPage,
  ProgramsPage,
  Home,
  ScreenPage,
  ProgramMapPage,
  SegmentSelectionPage,
} from 'Pages'

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="screen/:screenId/*" element={<ScreenPage />} />
      <Route path="admin" element={<AdminPage />} />
      <Route path="admin/programs" element={<ProgramsPage />} />
      <Route path="admin/programMap" element={<ProgramMapPage />} />
      <Route path="selection" element={<SegmentSelectionPage />} />
      <Route path="login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
