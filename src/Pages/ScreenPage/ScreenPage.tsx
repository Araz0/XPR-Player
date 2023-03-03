import { memo, useEffect } from 'react'

import { Typography } from '@mui/material'

import { CenterdContainer, Screen } from '../../components'
import { useSocketService } from '../../hooks'
import { useScreenService } from '../../services'
import { useScreenStore } from '../../stores'

export const ScreenPageRaw = () => {
  const program = useScreenStore((s) => s.program)
  const {
    onStart,
    onPause,
    onReset,
    onSetProgram,
    onToggleShowControls,
    onUserSelectedNextSegment,
  } = useSocketService()
  const {
    startProgram,
    pauseProgram,
    resetProgram,
    setScreenProgram,
    toggleShowingControls,
    setSelectedNextSegment,
  } = useScreenService()

  useEffect(() => {
    onStart(startProgram)
    onPause(pauseProgram)
    onReset(resetProgram)
    onSetProgram(setScreenProgram)
    onToggleShowControls(toggleShowingControls)
    onUserSelectedNextSegment(setSelectedNextSegment)
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
