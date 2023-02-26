import { memo, useEffect, useRef } from 'react'

import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { Typography, CircularProgress } from '@mui/material'

import { CenterdContainer, VideoPlayer } from '../../components'
import { program } from '../../fakeProgram'
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
  controls?: boolean
}

export const ScreenRaw = ({ controls = false }: ScreenProps) => {
  const programStarted = useScreenStore((s) => s.programStarted)
  const standByMode = useScreenStore((s) => s.standByMode)
  const { screenId } = useParams()
  const playerContainerRef = useRef<any>()
  const videoRef1 = useRef<any>()
  const videoRef2 = useRef<any>()

  const { init, requestFullScreen, requestShowControls } = useScreenService()

  useDoubleKeyPress('f', () => requestFullScreen())
  useDoubleKeyPress('c', () => requestShowControls())

  useEffect(() => {
    init(screenId, playerContainerRef, videoRef1, videoRef2)
  }, [init, screenId])

  return (
    <StyledScreenPlayerContainer ref={playerContainerRef}>
      {!programStarted && program && (
        <CenterdContainer>
          {standByMode === StandByMods.TEXT && (
            <Typography>
              Program ({program.title}) is set, waiting on your command to
              start!
            </Typography>
          )}
          {standByMode === StandByMods.ANIMATION && <CircularProgress />}
        </CenterdContainer>
      )}
      {programStarted && (
        <>
          <VideoPlayer ref={videoRef1} />
          <VideoPlayer ref={videoRef2} />
        </>
      )}
    </StyledScreenPlayerContainer>
  )
}

export const Screen = memo(ScreenRaw)
