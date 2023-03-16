import { memo } from 'react'

import { useParams } from 'react-router-dom'

import { Typography } from '@mui/material'

import { CenterdContainer, Screen } from 'components'

export const ScreenPageRaw = () => {
  const { screenId } = useParams()

  if (!screenId)
    return (
      <CenterdContainer>
        <Typography>Set a screen id first</Typography>
      </CenterdContainer>
    )

  return <Screen screenId={parseInt(screenId)} />
}
export const ScreenPage = memo(ScreenPageRaw)
