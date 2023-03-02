import { memo, useEffect } from 'react'

import { Typography } from '@mui/material'

import { CenterdContainer, Screen } from '../../components'
import { SocketService, useScreenService } from '../../services'
import { useScreenStore } from '../../stores'

const clientSocket = new SocketService()

export const ScreenPageRaw = () => {
  const program = useScreenStore((s) => s.program)

  const {
    startProgram,
    pauseProgram,
    resetProgram,
    setScreenProgram,
    toggleShowingControls,
    setSelectedNextSegment,
  } = useScreenService()

  useEffect(() => {
    clientSocket.onStart(startProgram)
    clientSocket.onPause(pauseProgram)
    clientSocket.onReset(resetProgram)
    clientSocket.onSetProgram(setScreenProgram)
    clientSocket.onToggleShowControls(toggleShowingControls)
    clientSocket.onUserSelectedNextSegment(setSelectedNextSegment)
    // todo: check if this hook dep. array effects anything
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!program)
    return (
      <CenterdContainer>
        <Typography>No program was selected</Typography>
      </CenterdContainer>
    )

  return <Screen />
}
export const ScreenPage = memo(ScreenPageRaw)
