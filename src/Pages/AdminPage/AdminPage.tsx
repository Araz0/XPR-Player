import { memo, useCallback } from 'react'

import { io } from 'socket.io-client'

import { LoginForm } from '../../components/LoginForm'
import { program } from '../../fakeProgram'
import { useSupabase } from '../../hooks'
import { EventNames } from '../../services'

export const AdminPageRaw = () => {
  const { saveProgram, loadAllPrograms, loadProgramsByUser } = useSupabase()

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

  const handleSaveProgram = useCallback(() => {
    saveProgram(program)
  }, [saveProgram])
  const handleGetUserPrograms = useCallback(() => {
    loadProgramsByUser()
  }, [loadProgramsByUser])
  return (
    <>
      <button onClick={handleStartProgram}>start program</button>
      <button onClick={handelRequestFullscreen}>request Fullscreen</button>
      <button onClick={handleSaveProgram}>save program</button>
      <button onClick={loadAllPrograms}>load program</button>
      <button onClick={handleGetUserPrograms}>loadProgramsByUser</button>
      <LoginForm />
    </>
  )
}

export const AdminPage = memo(AdminPageRaw)
