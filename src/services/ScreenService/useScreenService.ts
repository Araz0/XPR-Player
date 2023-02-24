import { useCallback } from 'react'

// import { io } from 'socket.io-client'

import { ScreenService } from './Screen.service'
import { PlayerContainerType, VideoRefElementType } from '../../types'
import { SocketService } from '../SocketService'

const screenPlayer = new ScreenService()
const clientSocket = new SocketService()

export const useScreenService = () => {
  const playPauseScreen = useCallback(() => {
    screenPlayer.playPause()
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

  const initSocket = useCallback(() => {
    clientSocket.onStart(playPauseScreen)
    clientSocket.onRequestFullScreen(requestFullScreen)
    // clientSocket.onSetProgram(something something here)
  }, [playPauseScreen, requestFullScreen])

  const init = useCallback(
    (
      container: PlayerContainerType,
      videoRef1: VideoRefElementType,
      videoRef2: VideoRefElementType
    ) => {
      screenPlayer.setRefs(container, videoRef1, videoRef2)

      // eslint-disable-next-line no-console
      console.log('📺 useScreenService init')
      initSocket()
    },
    [initSocket]
  )

  return {
    init,
    playPauseScreen,
    setCurrentSource,
    setNextSource,
    requestFullScreen,
  }
}
