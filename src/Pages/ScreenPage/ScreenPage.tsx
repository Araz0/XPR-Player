import { memo, useEffect } from 'react'

import { CircularProgress, Typography } from '@mui/material'

import { CenterdContainer, Screen } from '../../components'
import { SocketService, useScreenService } from '../../services'
import { useScreenStore } from '../../stores'
import { StandByMods } from '../../types'

const clientSocket = new SocketService()

export const ScreenPageRaw = () => {
  const program = useScreenStore((s) => s.program)
  const programStarted = useScreenStore((s) => s.programStarted)
  const setProgramStarted = useScreenStore((s) => s.setProgramStarted)
  const standByMode = useScreenStore((s) => s.standByMode)

  const { startProgram, requestFullScreen, setScreenProgram } =
    useScreenService()

  useEffect(() => {
    clientSocket.onStart(startProgram)
    clientSocket.onEndStandby(() => {
      setProgramStarted(true)
    })
    clientSocket.onRequestFullScreen(requestFullScreen)
    clientSocket.onSetProgram(setScreenProgram)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!program)
    return (
      <CenterdContainer>
        <Typography>No program was selected</Typography>
      </CenterdContainer>
    )
  if (!programStarted && program)
    return (
      <CenterdContainer>
        {standByMode === StandByMods.TEXT && (
          <Typography>
            Program is set, waiting on your command to start!
          </Typography>
        )}
        {standByMode === StandByMods.ANIMATION && <CircularProgress />}
      </CenterdContainer>
    )
  return <Screen controls />
}
export const ScreenPage = memo(ScreenPageRaw)
