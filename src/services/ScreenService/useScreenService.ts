import { useCallback } from 'react'

import { VideoRefElement } from '../../types'
import { ScreenService } from './Screen.service'

const screenPlayer = new ScreenService()

export const useScreenService = () => {
  const init = useCallback(
    (videoRef1: VideoRefElement, videoRef2: VideoRefElement) => {
      screenPlayer.setRefs(videoRef1, videoRef2)

      console.log('📺 useScreenService init')
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
