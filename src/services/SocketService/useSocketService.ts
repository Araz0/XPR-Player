import { useCallback } from 'react'

import { io } from 'socket.io-client'

import { EventNames } from './eventNames'
import { ProgramType } from '../../types'

const serverUrl = 'http://localhost:8000'
const socket = io(serverUrl)

export const useSocketService = () => {
  const emmit = useCallback((EventName: string, commandPackage: any) => {
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

  const emmitRequestFullscreen = useCallback(() => {
    emmit(EventNames.ADMIN_BRODCAST_FULLSCREEN, 'admin requested full screen')
  }, [emmit])

  const emmitStopProgram = useCallback(() => {
    emmit(EventNames.ADMIN_BRODCAST_STOP, 'admin requested program stop')
  }, [emmit])

  const emmitResetProgram = useCallback(() => {
    emmit(EventNames.ADMIN_BRODCAST_RESET, 'admin requested program reset')
  }, [emmit])

  const emmitShowControls = useCallback(() => {
    emmit(
      EventNames.ADMIN_BRODCAST_SHOW_CONTROLS,
      'admin requested show controls'
    )
  }, [emmit])

  const emmitHideControls = useCallback(() => {
    emmit(
      EventNames.ADMIN_BRODCAST_HIDE_CONTROLS,
      'admin requested hide controls'
    )
  }, [emmit])

  const emmitToggleShowControls = useCallback(() => {
    emmit(
      EventNames.ADMIN_BRODCAST_TOGGLE_SHOW_CONTROLS,
      'admin requested toggle show controls'
    )
  }, [emmit])

  return {
    emmit,
    emmitProgram,
    emmitStartProgram,
    emmitStopProgram,
    emmitResetProgram,
    emmitRequestFullscreen,
    emmitShowControls,
    emmitHideControls,
    emmitToggleShowControls,
  }
}
