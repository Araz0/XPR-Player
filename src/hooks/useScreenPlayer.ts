import { useCallback } from 'react'

import { ScreenController } from '../services'
import { VideoRefElement } from '../types'

const screenPlayer = new ScreenController()

export const useScreenPlayer = () => {
  const init = useCallback(
    (videoRef1: VideoRefElement, videoRef2: VideoRefElement) => {
      screenPlayer.setRefs(videoRef1, videoRef2)
      // eslint-disable-next-line no-console
      console.log('📺 useScreenPlayer init')
    },
    []
  )
  const playPauseScreen = useCallback(() => {
    screenPlayer.playPause()
  }, [])

  const setCurrentSource = useCallback((src: string) => {
    screenPlayer.setCurrentSource(src)
  }, [])
  const setNextSource = useCallback((src: string) => {
    screenPlayer.setNextSource(src)
  }, [])

  return {
    init,
    playPauseScreen,
    setCurrentSource,
    setNextSource,
  }
}
