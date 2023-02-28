import { Routes, Route } from 'react-router-dom'

import {
  AdminPage,
  ProgramsPage,
  Home,
  ScreenPage,
  CreatePage,
  ProgramMapPage,
} from './Pages'

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="screen" element={<ScreenPage />} />
      <Route path="screen/:screenId/*" element={<ScreenPage />} />
      <Route path="admin" element={<AdminPage />} />
      <Route path="admin/create" element={<CreatePage />} />
      <Route path="admin/programs" element={<ProgramsPage />} />
      <Route path="admin/programMap" element={<ProgramMapPage />} />
    </Routes>
  )
}

export default App
