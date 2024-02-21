import { useCallback } from 'react'

import { ScreenService, SocketService } from 'services'
import { useAdminStore, useScreenStore } from 'stores'
import { PlayerContainerType, ProgramType, VideoRefElementType } from 'types'

export function useScreenService(
  screenPlayerService: ScreenService,
  socketService?: SocketService
) {
  const setProgram = useScreenStore((s) => s.setProgram)
  const setProgramStarted = useScreenStore((s) => s.setProgramStarted)
  const setShowIdentification = useScreenStore((s) => s.setShowIdentification)
  const addLogToLogsArray = useAdminStore((s) => s.addLogToLogsArray)

  const playPauseScreen = useCallback(() => {
    screenPlayerService.playPause()
  }, [screenPlayerService])

  // const checkTimestampInterval = useCallback(
  //   (timestamp: number, exicute: () => void) => {
  //     const timer = setInterval(() => {
  //       // console.log(
  //       //   '🚀 ~ file: useScreenService.ts:24 ~ timer ~ Date.now():',
  //       //   Date.now()
  //       // )
  //       if (Date.now() >= timestamp) {
  //         // console.log(
  //         //   '🚀 ~ file: useScreenService.ts:24 ~ timer ~ Date.now() >= timestamp:',
  //         //   Date.now(),
  //         //   timestamp,
  //         //   Date.now() === timestamp
  //         // )
  //         exicute()
  //         clearInterval(timer)
  //       }
  //     }, 1) // Check every millisecond
  //     return () => {
  //       clearInterval(timer)
  //     }
  //   },
  //   []
  // )

  const startProgram = useCallback(
    (startTimestamp: number) => {
      screenPlayerService.playWithTimestamp(startTimestamp, () =>
        setProgramStarted(true)
      )
    },
    [screenPlayerService, setProgramStarted]
  )

  const pauseProgram = useCallback(() => {
    screenPlayerService.pause()
    setProgramStarted(false)
  }, [setProgramStarted, screenPlayerService])

  const resetProgram = useCallback(() => {
    screenPlayerService.reset()
    setProgramStarted(false)
  }, [setProgramStarted, screenPlayerService])

  const setCurrentSource = useCallback(
    (src: string) => {
      screenPlayerService.setCurrentSource(src)
    },
    [screenPlayerService]
  )

  const setNextSource = useCallback(
    (src: string) => {
      screenPlayerService.setNextSource(src)
    },
    [screenPlayerService]
  )

  const requestFullScreen = useCallback(() => {
    screenPlayerService.requestFullScreen()
  }, [screenPlayerService])

  const requestShowControls = useCallback(
    () => screenPlayerService.showControls(),
    [screenPlayerService]
  )
  const requestHideControls = useCallback(
    () => screenPlayerService.hideControls(),
    [screenPlayerService]
  )

  const toggleShowingControls = useCallback(
    () => screenPlayerService.toggleControls(),
    [screenPlayerService]
  )

  const setScreenProgram = useCallback(
    (program: ProgramType) => {
      screenPlayerService.setProgram(program)
      setProgram(program)

      screenPlayerService.nextPlayer().hide()
      screenPlayerService.setAllListners()
      screenPlayerService.setSrcToIntro()
    },
    [setProgram, screenPlayerService]
  )

  const setSelectedNextSegment = useCallback(
    (index: number) => {
      screenPlayerService.setNextSelectedSegmentIndex(index)
    },
    [screenPlayerService]
  )

  const showIdentificationTemporarly = useCallback(() => {
    setShowIdentification(true)
    const timeout = setTimeout(() => {
      setShowIdentification(false)
    }, 5000)
    return () => clearTimeout(timeout)
  }, [setShowIdentification])

  const setScreenListeners = useCallback(() => {
    if (!socketService) return
    socketService.onSetProgram(setScreenProgram)
    socketService.onStart(startProgram)
    socketService.onPause(pauseProgram)
    socketService.onReset(resetProgram)
    socketService.onToggleShowControls(toggleShowingControls)
    socketService.onUserSelectedNextSegment(setSelectedNextSegment)
    socketService.onAnything(addLogToLogsArray)
    socketService.onIdentifyScreens(showIdentificationTemporarly)
  }, [
    addLogToLogsArray,
    pauseProgram,
    resetProgram,
    setScreenProgram,
    setSelectedNextSegment,
    socketService,
    startProgram,
    toggleShowingControls,
    showIdentificationTemporarly,
  ])

  const destroySocket = useCallback(() => {
    if (!socketService) return
    socketService.disconnect()
  }, [socketService])

  const init = useCallback(
    (
      screenId: number,
      container: PlayerContainerType,
      videoRef1: VideoRefElementType,
      videoRef2: VideoRefElementType
    ) => {
      screenPlayerService.setRefs(screenId, container, videoRef1, videoRef2)
      screenPlayerService.onSetNextSegment(addLogToLogsArray)
    },
    [screenPlayerService, addLogToLogsArray]
  )

  return {
    init,
    playPauseScreen,
    startProgram,
    pauseProgram,
    resetProgram,
    setCurrentSource,
    setNextSource,
    requestFullScreen,
    setScreenProgram,
    requestShowControls,
    requestHideControls,
    toggleShowingControls,
    setSelectedNextSegment,
    setScreenListeners,
    destroySocket,
  }
}
