import { useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'

import { Home, ScreenPage } from './Pages'
function App() {
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8000')
    eventSource.onmessage = function (event) {
      const data = JSON.parse(event.data)

      console.log('recevied: ', data)
    }

    eventSource.onerror = function () {
      eventSource.close()
    }
  }, [])

  return (
    <Routes>
      <Route path="app/:screenId/*" element={<Home />} />
      <Route path="screen" element={<ScreenPage />} />
    </Routes>
  )
}

export default App
