import { memo, useEffect, useRef } from 'react'

import styled from 'styled-components'

import { Typography, CircularProgress } from '@mui/material'

import { StandbyOverlay, VideoPlayer } from '../../components'
import { useDoubleKeyPress } from '../../hooks'
import { useScreenService } from '../../services'
import { useScreenStore } from '../../stores'
import { StandByMods } from '../../types'

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
}

export const ScreenRaw = ({ screenId }: ScreenProps) => {
  const programStarted = useScreenStore((s) => s.programStarted)
  const standByMode = useScreenStore((s) => s.standByMode)
  const program = useScreenStore((s) => s.program)
  const playerContainerRef = useRef<any>()
  const videoRef1 = useRef<any>()
  const videoRef2 = useRef<any>()

  const {
    init,
    requestFullScreen,
    requestShowControls,
    forceDisplayOnePlayer,
  } = useScreenService()

  useDoubleKeyPress('f', () => requestFullScreen())
  useDoubleKeyPress('c', () => requestShowControls())

  useEffect(() => {
    init(screenId, playerContainerRef, videoRef1, videoRef2)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    forceDisplayOnePlayer()
  }, [forceDisplayOnePlayer])

  return (
    <StyledScreenPlayerContainer ref={playerContainerRef}>
      {!programStarted && (
        <StandbyOverlay>
          {standByMode === StandByMods.TEXT && (
            <Typography>
              Program ({program?.title}) is set, waiting on your command to
              start!
            </Typography>
          )}
          {standByMode === StandByMods.ANIMATION && <CircularProgress />}
        </StandbyOverlay>
      )}
      <>
        <VideoPlayer ref={videoRef1} />
        <VideoPlayer ref={videoRef2} />
      </>
    </StyledScreenPlayerContainer>
  )
}

export const Screen = memo(ScreenRaw)
