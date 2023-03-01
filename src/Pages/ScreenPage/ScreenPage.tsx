import { memo, useEffect } from 'react'

import { Typography } from '@mui/material'

import { CenterdContainer, Screen } from '../../components'
import { SocketService, useScreenService } from '../../services'
import { useScreenStore } from '../../stores'

const clientSocket = new SocketService()

export const ScreenPageRaw = () => {
  const program = useScreenStore((s) => s.program)

  const setProgramStarted = useScreenStore((s) => s.setProgramStarted)

  const { startProgram, setScreenProgram, toggleShowingControls } =
    useScreenService()

  useEffect(() => {
    clientSocket.onStart(() => {
      setProgramStarted(true)
      startProgram()
    })
    clientSocket.onSetProgram(setScreenProgram)
    clientSocket.onToggleShowControls(toggleShowingControls)
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
