import { memo, useCallback, useEffect, useRef } from 'react'

import styled from 'styled-components'

import { VideoPlayer } from '../../components'
import { useDoubleKeyPress } from '../../hooks'
import { useScreenService } from '../../services'

const StyledScreenPlayerContainer = styled.div`
  position: relative;
  video {
    position: absolute;
  }
`

export type ScreenProps = {
  controls?: boolean
}

export const ScreenRaw = ({ controls = false }: ScreenProps) => {
  const playerContainerRef = useRef<any>()
  const videoRef1 = useRef<any>()
  const videoRef2 = useRef<any>()
  const newUrlInputRef = useRef<any>()

  const {
    init,
    setCurrentSource,
    setNextSource,
    playPauseScreen,
    requestFullScreen,
  } = useScreenService()

  useDoubleKeyPress('f', () => requestFullScreen())

  useEffect(() => {
    init(playerContainerRef, videoRef1, videoRef2)
  }, [init])

  const handlePlayPause = useCallback(() => {
    playPauseScreen()
  }, [playPauseScreen])
  const handleRequestFullscreen = useCallback(() => {
    requestFullScreen()
  }, [requestFullScreen])

  const handleSetCurrentSource = useCallback(() => {
    newUrlInputRef.current.value.length > 0
      ? setCurrentSource(newUrlInputRef.current.value)
      : setCurrentSource('https://www.w3schools.com/html/mov_bbb.mp4')
  }, [setCurrentSource])

  const handleSetNextSource = useCallback(() => {
    newUrlInputRef.current.value.length > 0
      ? setNextSource(newUrlInputRef.current.value)
      : setNextSource('https://media.w3.org/2010/05/sintel/trailer.mp4')
  }, [setNextSource])

  return (
    <>
      {controls && (
        <>
          <button onClick={handlePlayPause}>PlayPause</button>
          <button onClick={handleSetCurrentSource}>set current</button>
          <button onClick={handleSetNextSource}>set next</button>
          <button onClick={handleRequestFullscreen}>fullscreen</button>
          <input type="text" name="" id="newUrlInput" ref={newUrlInputRef} />
        </>
      )}
      <StyledScreenPlayerContainer ref={playerContainerRef}>
        <VideoPlayer ref={videoRef1} />
        <VideoPlayer ref={videoRef2} />
      </StyledScreenPlayerContainer>
    </>
  )
}

export const Screen = memo(ScreenRaw)
