import { memo } from 'react'

import { io } from 'socket.io-client'

export const AdminRaw = () => {
  const handleSendCommand = () => {
    const socket = io('http://localhost:8000')
    socket.emit('admin-Brodcast-start', 'new command sent from admin')
  }
  return (
    <>
      <button onClick={handleSendCommand}>send command</button>
    </>
  )
}

export const Admin = memo(AdminRaw)
