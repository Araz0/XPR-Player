import { memo, useCallback, useEffect, useRef } from 'react'

import styled from 'styled-components'

import { VideoPlayer } from '../../components'
import { useScreenService } from '../../services'

const StyledScreenPlayerContainer = styled.div`
  position: relative;
  video {
    position: absolute;
  }
`

export const ScreenPageRaw = () => {
  const videoRef1 = useRef<any>()
  const videoRef2 = useRef<any>()
  const newUrlInputRef = useRef<any>()

  const { init, setCurrentSource, setNextSource, playPauseScreen } =
    useScreenService()

  useEffect(() => {
    init(videoRef1, videoRef2)
  }, [init])

  const handlePlayPause = useCallback(() => {
    playPauseScreen()
  }, [playPauseScreen])

  const handleSetCurrentSource = useCallback(() => {
    newUrlInputRef.current.value.length > 0
      ? setCurrentSource(newUrlInputRef.current.value)
      : setCurrentSource('/Audio_Video_Sync.mp4')
  }, [setCurrentSource])

  const handleSetNextSource = useCallback(() => {
    newUrlInputRef.current.value.length > 0
      ? setNextSource(newUrlInputRef.current.value)
      : setNextSource('/60fps_Tester.mp4')
  }, [setNextSource])

  return (
    <>
      <button onClick={handlePlayPause}>PlayPause</button>
      <button onClick={handleSetCurrentSource}>set current</button>
      <button onClick={handleSetNextSource}>set next</button>
      <input type="text" name="" id="newUrlInput" ref={newUrlInputRef} />
      <StyledScreenPlayerContainer>
        <VideoPlayer ref={videoRef1} />
        <VideoPlayer ref={videoRef2} />
      </StyledScreenPlayerContainer>
    </>
  )
}
export const ScreenPage = memo(ScreenPageRaw)
