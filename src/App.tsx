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
import { useSocketService } from 'services'

function App() {
  const { socketService } = useSocketService()

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route
        path="screen/:screenId/*"
        element={<ScreenPage socketService={socketService} />}
      />
      <Route
        path="admin"
        element={<AdminPage socketService={socketService} />}
      />
      <Route path="admin/programs" element={<ProgramsPage />} />
      <Route path="admin/programMap" element={<ProgramMapPage />} />
      <Route
        path="selection"
        element={<SegmentSelectionPage socketService={socketService} />}
      />
      <Route path="login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
