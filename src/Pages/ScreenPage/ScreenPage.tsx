import { memo, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { Typography } from '@mui/material'

import { CenterdContainer, Screen } from '../../components'
import { useScreenService } from '../../services'
import { useScreenStore } from '../../stores'

export const ScreenPageRaw = () => {
  const program = useScreenStore((s) => s.program)
  const { screenId } = useParams()
  const { setScerenListeners } = useScreenService()

  useEffect(() => {
    setScerenListeners()
  }, [setScerenListeners])

  if (!screenId)
    return (
      <CenterdContainer>
        <Typography>Set a screen id first</Typography>
      </CenterdContainer>
    )

  if (!program)
    return (
      <CenterdContainer>
        <Typography>No program was selected</Typography>
      </CenterdContainer>
    )

  return <Screen screenId={parseInt(screenId)} />
}
export const ScreenPage = memo(ScreenPageRaw)
