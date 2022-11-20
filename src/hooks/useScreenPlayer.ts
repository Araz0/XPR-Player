import { useCallback } from 'react'

import { ScreenPlayer } from '../services'

const screenPlayer = new ScreenPlayer()

export const useScreenPlayer = () => {
  const init = useCallback(
    (videoElement: React.MutableRefObject<any> | null) => {
      screenPlayer.videoElement = videoElement
    },
    []
  )
  const playScreen = useCallback(() => {
    screenPlayer.play()
  }, [])

  const pauseScreen = useCallback(() => {
    screenPlayer.pause()
  }, [])

  const setSource = useCallback((src: string) => {
    screenPlayer.setSource(src)
  }, [])
  return { init, playScreen, pauseScreen, setSource }
}
