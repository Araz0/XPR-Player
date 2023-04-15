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

export type ScreenProps = {
  screenId: number
  screenService: ScreenService
  backgroundColor?: string
  muted?: boolean
  socketService?: SocketService
  standByMode?: StandByMods
}

export const ScreenRaw = ({
  screenId,
  screenService,
  backgroundColor,
  muted,
  socketService,
  standByMode,
}: ScreenProps) => {
  const programStarted = useScreenStore((s) => s.programStarted)
  const program = useScreenStore((s) => s.program)
  const playerContainerRef = useRef<any>()
  const videoRef1 = useRef<any>()
  const videoRef2 = useRef<any>()

  const [loading, setLoading] = useState(true)
  const [showOverlay, setShowOverlay] = useState(true)

  useEffect(() => {
    if (program) setLoading(false)
  }, [program])

  useEffect(() => {
    if (programStarted) setShowOverlay(false)
  }, [programStarted])

  const { init, requestFullScreen, requestShowControls, setScerenListeners } =
    useScreenService(screenService, socketService)

  useDoubleKeyPress('f', () => requestFullScreen())
  useDoubleKeyPress('c', () => requestShowControls())

  useEffect(() => {
    init(screenId, playerContainerRef, videoRef1, videoRef2)
    setScerenListeners()
  }, [init, screenId, setScerenListeners])

  const onReadyClick = useCallback(() => {
    setShowOverlay(false)
  }, [])

  return (
    <StyledScreenPlayerContainer ref={playerContainerRef}>
      {showOverlay && (
        <StandbyOverlay
          backgroundColor={backgroundColor}
          onClick={loading ? undefined : onReadyClick}
        >
          {!standByMode ? (
            <LoadingAnimation loading={loading} />
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
          <code>{loading ? 'Waiting for program...' : 'click when ready'}</code>
        </StandbyOverlay>
      )}
      <>
        <VideoPlayer reference={videoRef1} muted={muted} />
        <VideoPlayer reference={videoRef2} muted={muted} />
      </>
    </StyledScreenPlayerContainer>
  )
}

export const Screen = memo(ScreenRaw)
