import { useCallback } from 'react'

import { ScreenService } from './Screen.service'
import { useScreenStore } from '../../stores'
import {
  PlayerContainerType,
  ProgramType,
  VideoRefElementType,
} from '../../types'

const screenPlayer = new ScreenService()

export function useScreenService() {
  const setProgram = useScreenStore((s) => s.setProgram)
  const setProgramStarted = useScreenStore((s) => s.setProgramStarted)

  const playPauseScreen = useCallback(() => {
    screenPlayer.playPause()
  }, [])

  const startProgram = useCallback(() => {
    screenPlayer.play()
    setProgramStarted(true)
  }, [setProgramStarted])

  const setCurrentSource = useCallback((src: string) => {
    screenPlayer.setCurrentSource(src)
  }, [])

  const setNextSource = useCallback((src: string) => {
    screenPlayer.setNextSource(src)
  }, [])

  const requestFullScreen = useCallback(() => {
    screenPlayer.requestFullScreen()
  }, [])

  const requestShowControls = useCallback(() => screenPlayer.showControls(), [])
  const requestHideControls = useCallback(() => screenPlayer.hideControls(), [])

  const toggleShowingControls = useCallback(
    () => screenPlayer.toggleControls(),
    []
  )

  const setScreenProgram = useCallback(
    (program: ProgramType) => {
      screenPlayer.setProgram(program)
      setProgram(program)
    },
    [setProgram]
  )
  const forceDisplayOnePlayer = useCallback(() => {
    screenPlayer.nextPlayer().hide()
    screenPlayer.setAllListners()
    screenPlayer.setSrcToIntro()
  }, [])

  const setSelectedNextSegment = (index: number) => {
    screenPlayer.setNextSelectedSegmentIndex(index)
  }

  const init = useCallback(
    (
      screenId: number,
      container: PlayerContainerType,
      videoRef1: VideoRefElementType,
      videoRef2: VideoRefElementType
    ) => {
      screenPlayer.setRefs(screenId, container, videoRef1, videoRef2)

      // eslint-disable-next-line no-console
      console.log('📺 useScreenService init')
    },
    []
  )

  return {
    init,
    playPauseScreen,
    setCurrentSource,
    setNextSource,
    requestFullScreen,
    setScreenProgram,
    startProgram,
    requestShowControls,
    requestHideControls,
    toggleShowingControls,
    forceDisplayOnePlayer,
    setSelectedNextSegment,
  }
}
