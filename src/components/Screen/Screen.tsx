import { memo, useCallback, useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

import { Typography } from '@mui/material'
import { LoadingAnimation } from 'components/LoadingAnimation'
import { StandbyOverlay } from 'components/StandbyOverlay'
import { VideoPlayer } from 'components/VideoPlayer'

import { useDoubleKeyPress } from 'hooks'
import { ScreenService, SocketService, useScreenService } from 'services'
import { useScreenStore } from 'stores'
import { StandByMods } from 'types'

const StyledScreenPlayerContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  video {
    position: absolute;
  }
`

const StyledIdentityWrapper = styled.div`
  position: absolute;
  z-index: 100;
  bottom: 25px;
  left: 25px;
  span {
    color: white;
    font-size: 2rem;
    font-weight: bold;
  }
`

export type ScreenProps = {
  screenId: number
  screenService: ScreenService
  backgroundColor?: string
  muted?: boolean
  socketService?: SocketService
  standByMode?: StandByMods
  readyByClick?: boolean
}

export const ScreenRaw = ({
  screenId,
  screenService,
  backgroundColor,
  muted,
  socketService,
  standByMode,
  readyByClick = false,
}: ScreenProps) => {
  const programStarted = useScreenStore((s) => s.programStarted)
  const program = useScreenStore((s) => s.program)
  const showIdentification = useScreenStore((s) => s.showIdentification)
  const playerContainerRef = useRef<any>()
  const videoRef1 = useRef<any>()
  const videoRef2 = useRef<any>()

  const [isLoading, setIsLoading] = useState(true)
  const [showOverlay, setShowOverlay] = useState(true)

  useEffect(() => {
    if (program) setIsLoading(false)
  }, [program])

  useEffect(() => {
    if (programStarted) setShowOverlay(false)
  }, [programStarted])

  const { init, requestFullScreen, requestShowControls, setScreenListeners } =
    useScreenService(screenService, socketService)

  useDoubleKeyPress('f', () => requestFullScreen())
  useDoubleKeyPress('c', () => requestShowControls())

  // useEffect that

  const onRecivedScreenReady = useCallback(
    (recivedScreenId: number) => {
      if (recivedScreenId === screenId) setShowOverlay(false)
    },
    [screenId]
  )

  useEffect(() => {
    init(screenId, playerContainerRef, videoRef1, videoRef2)
    setScreenListeners()
    socketService?.onScreenIsReady(onRecivedScreenReady)
  }, [init, onRecivedScreenReady, screenId, setScreenListeners, socketService])

  const onReadyClick = useCallback(() => {
    if (readyByClick) {
      setShowOverlay(false)
      socketService?.emmitScreenIsReady(screenId)
    }
  }, [screenId, socketService, readyByClick])

  return (
    <StyledScreenPlayerContainer ref={playerContainerRef}>
      {showOverlay && (
        <StandbyOverlay
          backgroundColor={backgroundColor}
          onClick={isLoading && readyByClick ? undefined : onReadyClick}
        >
          {!standByMode ? (
            <LoadingAnimation isLoading={isLoading} />
          ) : (
            standByMode === StandByMods.TEXT && (
              <Typography>
                {program?.media[screenId]
                  ? `Program (${program.title}) is set, waiting on your command to
              start!`
                  : `No media found on screen id ${screenId}`}
              </Typography>
            )
          )}
          <code>
            {isLoading
              ? 'Waiting for program...'
              : readyByClick
              ? 'click when ready'
              : 'screen is not ready'}
          </code>
        </StandbyOverlay>
      )}
      <>
        <VideoPlayer reference={videoRef1} muted={muted} />
        <VideoPlayer reference={videoRef2} muted={muted} />
      </>
      {showIdentification && (
        <StyledIdentityWrapper>
          <span>
            {program
              ? `${screenId}: ${program.screensInfo[screenId].title}`
              : `Screen id: ${screenId}`}
          </span>
        </StyledIdentityWrapper>
      )}
    </StyledScreenPlayerContainer>
  )
}

export const Screen = memo(ScreenRaw)
