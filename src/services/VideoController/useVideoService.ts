import { useCallback } from 'react'

import { VideoRefElement } from '../../types'
import { VideoController } from './VideoController.service'

const videoPlayer = new VideoController('C')

export const useVideoService = () => {
  const init = useCallback((videoElement: VideoRefElement) => {
    videoPlayer.videoElement = videoElement
  }, [])
  const playVideo = useCallback(() => {
    videoPlayer.play()
  }, [])

  const pauseVideo = useCallback(() => {
    videoPlayer.pause()
  }, [])

  const setSource = useCallback((src: string) => {
    videoPlayer.setSource(src)
  }, [])

  const toggleMute = useCallback(() => {
    videoPlayer.toggleMute()
  }, [])
  const getDuration = useCallback(() => {
    videoPlayer.getDuration()
  }, [])
  return { init, playVideo, pauseVideo, setSource, toggleMute, getDuration }
}
