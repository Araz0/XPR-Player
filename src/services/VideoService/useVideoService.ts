import { useCallback } from 'react'

import { VideoService } from './Video.service'
import { VideoRefElementType } from '../../types'

const videoPlayer = new VideoService('C')

export const useVideoService = () => {
  const init = useCallback((videoElement: VideoRefElementType) => {
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
