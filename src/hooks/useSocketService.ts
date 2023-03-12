import { useCallback } from 'react'

import { io } from 'socket.io-client'

import { ProgramType, EventNames } from '../types'

const serverUrl = 'http://localhost:8000'
const socket = io(serverUrl)

export function useSocketService() {
  const emmit = useCallback((EventName: string, commandPackage: any) => {
    socket.emit(EventName, commandPackage)
  }, [])

  const emmitProgram = useCallback(
    (program: ProgramType) => {
      emmit(EventNames.SET_PROGRAM, program)
    },
    [emmit]
  )

  const emmitStartProgram = useCallback(() => {
    emmit(EventNames.START_PROGRAM, 'admin requested program start')
  }, [emmit])

  const emmitRequestFullscreen = useCallback(() => {
    emmit(EventNames.REQUEST_FULLSCREEN, 'admin requested full screen')
  }, [emmit])

  const emmitStopProgram = useCallback(() => {
    emmit(EventNames.STOP_PROGRAM, 'admin requested program stop')
  }, [emmit])

  const emmitPauseProgram = useCallback(() => {
    emmit(EventNames.PAUSE_PROGRAM, 'admin requested program pause')
  }, [emmit])

  const emmitResetProgram = useCallback(() => {
    emmit(EventNames.RESET_PROGRAM, 'admin requested program reset')
  }, [emmit])

  const emmitShowControls = useCallback(() => {
    emmit(EventNames.SHOW_CONTROLS, 'admin requested show controls')
  }, [emmit])

  const emmitHideControls = useCallback(() => {
    emmit(EventNames.HIDE_CONTROLS, 'admin requested hide controls')
  }, [emmit])

  const emmitToggleShowControls = useCallback(() => {
    emmit(
      EventNames.TOGGLE_SHOW_CONTROLS,
      'admin requested toggle show controls'
    )
  }, [emmit])

  const emmitSelectedScreenIndex = useCallback(
    (index: number) => {
      emmit(EventNames.USER_SELECTED_SEGMENT, index)
    },
    [emmit]
  )

  const onSetProgram = useCallback(
    (exicute: (program: ProgramType) => void) => {
      socket.on(EventNames.SET_PROGRAM, (program: ProgramType) => {
        // eslint-disable-next-line no-console
        console.log(
          `Received command (set-program): `,
          new Date().getMilliseconds()
        )
        exicute(program)
      })
    },
    []
  )

  const onStart = useCallback((exicute: () => void) => {
    socket.on(EventNames.START_PROGRAM, (data: any) => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (start-program): ${data}`,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }, [])

  const onPause = useCallback((exicute: () => void) => {
    socket.on(EventNames.PAUSE_PROGRAM, (data: any) => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (pause-program): ${data}`,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }, [])

  const onReset = useCallback((exicute: () => void) => {
    socket.on(EventNames.RESET_PROGRAM, (data: any) => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (reset-program): ${data}`,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }, [])

  const onRequestFullScreen = useCallback((exicute: () => void) => {
    socket.on(EventNames.REQUEST_FULLSCREEN, (data: any) => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (request-full-screen): ${data}`,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }, [])

  const onShowControls = useCallback((exicute: () => void) => {
    socket.on(EventNames.SHOW_CONTROLS, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (show-controls): `,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }, [])

  const onHideControls = useCallback((exicute: () => void) => {
    socket.on(EventNames.HIDE_CONTROLS, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (hide-controls): `,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }, [])

  const onUserSelectedNextSegment = useCallback(
    (exicute: (selectedNextSegmentIndex: number) => void) => {
      socket.on(
        EventNames.USER_SELECTED_SEGMENT,
        (selectedNextSegmentIndex: number) => {
          // eslint-disable-next-line no-console
          console.log(
            `Received command (user-selected-segment): `,
            new Date().getMilliseconds()
          )
          exicute(selectedNextSegmentIndex)
        }
      )
    },
    []
  )

  const onToggleShowControls = useCallback((exicute: () => void) => {
    socket.on(EventNames.TOGGLE_SHOW_CONTROLS, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (toggle-show-controls): `,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }, [])

  return {
    emmit,
    emmitProgram,
    emmitStartProgram,
    emmitPauseProgram,
    emmitStopProgram,
    emmitResetProgram,
    emmitRequestFullscreen,
    emmitShowControls,
    emmitHideControls,
    emmitToggleShowControls,
    emmitSelectedScreenIndex,
    onStart,
    onPause,
    onReset,
    onRequestFullScreen,
    onSetProgram,
    onShowControls,
    onHideControls,
    onUserSelectedNextSegment,
    onToggleShowControls,
  }
}
