import { useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'

import { Home } from './Pages'
function App() {
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8000')
    eventSource.onmessage = function (event) {
      // eslint-disable-next-line no-console
      console.log(event.data)
    }

    eventSource.onerror = function () {
      // eslint-disable-next-line no-console
      eventSource.close()
    }
  }, [])

  return (
    <Routes>
      <Route path="app/:screenId/*" element={<Home />} />
    </Routes>
  )
}

export default App
