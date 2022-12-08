import { memo, useCallback, useEffect, useRef } from 'react'

import { VideoPlayer } from '../../components'
import { useScreenPlayer } from '../../hooks'

export const ScreenPageRaw = () => {
  const videoRef1 = useRef<any>()
  const videoRef2 = useRef<any>()

  const { init, setCurrentSource, setNextSource, playPauseScreen } =
    useScreenPlayer()

  useEffect(() => {
    init(videoRef1, videoRef2)
  }, [init])

  const handlePlayPause = useCallback(() => {
    playPauseScreen()
  }, [playPauseScreen])

  const handleSetCurrentSource = useCallback(() => {
    setCurrentSource('https://media.w3.org/2010/05/video/movie_300.mp4')
  }, [setCurrentSource])

  const handleSetNextSource = useCallback(() => {
    setNextSource('https://media.w3.org/2010/05/video/movie_300.mp4')
  }, [setNextSource])

  return (
    <>
      <button onClick={handlePlayPause}>PlayPause</button>
      <button onClick={handleSetCurrentSource}>set current</button>
      <button onClick={handleSetNextSource}>set next</button>
      <VideoPlayer ref={videoRef1} />
      <VideoPlayer ref={videoRef2} />
    </>
  )
}
export const ScreenPage = memo(ScreenPageRaw)
