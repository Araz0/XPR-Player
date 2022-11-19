import { Routes, Route } from 'react-router-dom'

import { Home } from './components'

function App() {
  return (
    <Routes>
      <Route path="app/:screenId/*" element={<Home />} />
    </Routes>
  )
}

export default App
