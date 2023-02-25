import { memo, useCallback, useEffect, useRef } from 'react'

import { useParams } from 'react-router-dom'
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
  const { screenId } = useParams()
  const playerContainerRef = useRef<any>()
  const videoRef1 = useRef<any>()
  const videoRef2 = useRef<any>()

  const { init, playPauseScreen, requestFullScreen } = useScreenService()

  useDoubleKeyPress('f', () => requestFullScreen())

  useEffect(() => {
    init(screenId, playerContainerRef, videoRef1, videoRef2)
  }, [init, screenId])

  const handlePlayPause = useCallback(() => {
    playPauseScreen()
  }, [playPauseScreen])
  const handleRequestFullscreen = useCallback(() => {
    requestFullScreen()
  }, [requestFullScreen])

  return (
    <>
      {controls && (
        <>
          <button onClick={handlePlayPause}>PlayPause</button>
          <button onClick={handleRequestFullscreen}>fullscreen</button>
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
