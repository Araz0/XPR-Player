import { memo } from 'react'

import { useParams } from 'react-router-dom'

import { Typography } from '@mui/material'

import { CenterdContainer, Screen } from 'components'
import { useSocketService } from 'services'

export const ScreenPageRaw = () => {
  const { screenId } = useParams()
  const { socketService } = useSocketService()
  if (!screenId)
    return (
      <CenterdContainer>
        <Typography>Set a screen id first</Typography>
      </CenterdContainer>
    )

  return <Screen screenId={parseInt(screenId)} socketService={socketService} />
}
export const ScreenPage = memo(ScreenPageRaw)
