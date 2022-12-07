import { useCallback } from 'react'

import { VideoController } from '../services'
import { VideoRefElement } from '../types'

const screenPlayer = new VideoController('C')

export const useScreenPlayer = () => {
  const init = useCallback((videoElement: VideoRefElement) => {
    screenPlayer.videoElement = videoElement
  }, [])
  const playScreen = useCallback(() => {
    screenPlayer.play()
  }, [])

  const pauseScreen = useCallback(() => {
    screenPlayer.pause()
  }, [])

  const setSource = useCallback((src: string) => {
    screenPlayer.setSource(src)
  }, [])

  const toggleMute = useCallback(() => {
    screenPlayer.toggleMute()
  }, [])
  const getDuration = useCallback(() => {
    screenPlayer.getDuration()
  }, [])
  return { init, playScreen, pauseScreen, setSource, toggleMute, getDuration }
}
