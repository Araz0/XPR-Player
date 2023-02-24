import { useCallback } from 'react'

import { io } from 'socket.io-client'

import { EventNames } from './eventNames'
import { ProgramType } from '../../types'

const serverUrl = 'http://localhost:8000'

export const useSocketService = () => {
  const emmit = useCallback((EventName: string, commandPackage: any) => {
    const socket = io(serverUrl)
    socket.emit(EventName, commandPackage)
  }, [])
  const emmitProgram = useCallback(
    (program: ProgramType) => {
      emmit(EventNames.ADMIN_BRODCAST_PROGRAM, program)
    },
    [emmit]
  )
  const emmitStartProgram = useCallback(() => {
    emmit(EventNames.ADMIN_BRODCAST_START, 'admin requested program start')
  }, [emmit])
  const emmitStopProgram = useCallback(() => {
    emmit(EventNames.ADMIN_BRODCAST_STOP, 'admin requested program stop')
  }, [emmit])
  const emmitresetProgram = useCallback(() => {
    emmit(EventNames.ADMIN_BRODCAST_RESET, 'admin requested program reset')
  }, [emmit])

  return {
    emmit,
    emmitProgram,
    emmitStartProgram,
    emmitStopProgram,
    emmitresetProgram,
  }
}
