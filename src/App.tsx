import { useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'
import { io } from 'socket.io-client'

import { Admin, Home, ScreenPage } from './Pages'
function App() {
  useEffect(() => {
    console.log('araz, ja i bin da')
    const socket = io('http://localhost:8000')

    socket.on('clientCommand', (command: any) => {
      const currentDate = new Date()
      console.log(`Received command: ${command}`, currentDate.getMilliseconds())
    })

    socket.on('hello', (args) => {
      console.log(args)
    })
    socket.emit('howdy', 'stranger')
  }, [])

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
