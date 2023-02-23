import { memo, useCallback, useEffect, useState } from 'react'

import { io } from 'socket.io-client'

import { AdminPageWrapper } from '../../components'
import { useSupabase } from '../../hooks'
import { EventNames } from '../../services'
import { DbProgram } from '../../types'

export const AdminPageRaw = () => {
  const { loadProgramsByUser } = useSupabase()
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)
  const [programs, setPrograms] = useState<any>()
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

  useEffect(() => {
    setLoading(true)
    loadProgramsByUser()
      .then((res) => {
        setPrograms(res)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [loadProgramsByUser])

  return (
    <AdminPageWrapper>
      <button onClick={handleStartProgram}>start program</button>
      <button onClick={handelRequestFullscreen}>request Fullscreen</button>
      {loading && <h1>loading...</h1>}
      {error && <h1>{error}</h1>}
      {programs && (
        <>
          <h1>programs:</h1>
          {programs.map((program: DbProgram) => {
            return (
              <button
                key={program.id}
                onClick={() => alert(program.internal_id)}
              >
                {program.program.title}
              </button>
            )
          })}
        </>
      )}
    </AdminPageWrapper>
  )
}

export const AdminPage = memo(AdminPageRaw)
