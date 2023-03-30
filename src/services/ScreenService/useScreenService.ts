import { useCallback } from 'react'

import { ScreenService, useSocketService } from 'services'
import { useAdminStore, useScreenStore } from 'stores'
import { PlayerContainerType, ProgramType, VideoRefElementType } from 'types'

export function useScreenService(screenPlayerService: ScreenService) {
  const setProgram = useScreenStore((s) => s.setProgram)
  const setProgramStarted = useScreenStore((s) => s.setProgramStarted)
  const addLogToLogsArray = useAdminStore((s) => s.addLogToLogsArray)

  const { socketService } = useSocketService()

  const playPauseScreen = useCallback(() => {
    screenPlayerService.playPause()
  }, [screenPlayerService])

  const startProgram = useCallback(() => {
    screenPlayerService.play()
    setProgramStarted(true)
  }, [setProgramStarted, screenPlayerService])

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

  const setScerenListeners = useCallback(() => {
    socketService.onSetProgram(setScreenProgram)
    socketService.onStart(startProgram)
    socketService.onPause(pauseProgram)
    socketService.onReset(resetProgram)
    socketService.onToggleShowControls(toggleShowingControls)
    socketService.onUserSelectedNextSegment(setSelectedNextSegment)
    socketService.onAnything(addLogToLogsArray)
    // force no rerenders on this hook
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setSelectedNextSegment = (index: number) => {
    screenPlayerService.setNextSelectedSegmentIndex(index)
  }

  const init = useCallback(
    (
      screenId: number,
      container: PlayerContainerType,
      videoRef1: VideoRefElementType,
      videoRef2: VideoRefElementType
    ) => {
      screenPlayerService.setRefs(screenId, container, videoRef1, videoRef2)
      // eslint-disable-next-line no-console
      console.log('📺 useScreenService init', screenId)
    },
    [screenPlayerService]
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
    setScerenListeners,
  }
}
