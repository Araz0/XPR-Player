import { useCallback } from 'react'

// import { io } from 'socket.io-client'

import { ScreenService } from './Screen.service'
import { useScreenStore } from '../../stores'
import {
  PlayerContainerType,
  ProgramType,
  VideoRefElementType,
} from '../../types'

const screenPlayer = new ScreenService()

export const useScreenService = () => {
  const setProgram = useScreenStore((s) => s.setProgram)

  const playPauseScreen = useCallback(() => {
    screenPlayer.playPause()
  }, [])

  const startProgram = useCallback(() => {
    screenPlayer.play()
  }, [])

  const setCurrentSource = useCallback((src: string) => {
    screenPlayer.setCurrentSource(src)
  }, [])

  const setNextSource = useCallback((src: string) => {
    screenPlayer.setNextSource(src)
  }, [])

  const requestFullScreen = useCallback(() => {
    screenPlayer.requestFullScreen()
  }, [])

  const setScreenProgram = useCallback(
    (program: ProgramType) => {
      screenPlayer.setProgram(program)
      setProgram(program)
    },
    [setProgram]
  )

  const init = useCallback(
    (
      screenId: string | undefined,
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
  }
}
