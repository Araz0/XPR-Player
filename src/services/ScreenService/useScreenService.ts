import { useCallback } from 'react'

// import { io } from 'socket.io-client'

import { VideoRefElement } from '../../types'
import { SocketService } from '../SocketService'
import { ScreenService } from './Screen.service'

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

  const initSocket = useCallback(() => {
    clientSocket.onStart(playPauseScreen)
  }, [playPauseScreen])

  const init = useCallback(
    (videoRef1: VideoRefElement, videoRef2: VideoRefElement) => {
      screenPlayer.setRefs(videoRef1, videoRef2)

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
  }
}
