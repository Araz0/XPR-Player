import { memo, useCallback } from 'react'

import { io } from 'socket.io-client'

import { AdminPageWrapper } from '../../components'
import { EventNames } from '../../services'

export const AdminPageRaw = () => {
  const handleStartProgram = useCallback(() => {
    const socket = io('http://localhost:8000')
    socket.emit(
      EventNames.ADMIN_BRODCAST_START,
      'admin requested program start'
    )
  }, [])
  const handelRequestFullscreen = useCallback(() => {
    const socket = io('http://localhost:8000')
    socket.emit(
      EventNames.ADMIN_BRODCAST_FULLSCREEN,
      'admin requested fullscreen'
    )
  }, [])

  return (
    <AdminPageWrapper>
      <button onClick={handleStartProgram}>start program</button>
      <button onClick={handelRequestFullscreen}>request Fullscreen</button>
    </AdminPageWrapper>
  )
}

export const AdminPage = memo(AdminPageRaw)
