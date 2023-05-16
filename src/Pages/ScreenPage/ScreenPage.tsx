import { memo, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { Typography } from '@mui/material'

import { CenterdContainer, Screen } from 'components'
import { ScreenService, SocketService } from 'services'

export type ScreenPageProps = {
  socketService: SocketService
}
export const ScreenPageRaw = ({ socketService }: ScreenPageProps) => {
  const { screenId } = useParams()

  useEffect(() => {
    // change page title
    document.title = `XPR | Screen ${screenId}`
    return () => {
      document.title = `XPR`
    }
  }, [screenId])
  if (!screenId)
    return (
      <CenterdContainer>
        <Typography>Set a screen id first</Typography>
      </CenterdContainer>
    )

  return (
    <Screen
      screenId={parseInt(screenId)}
      screenService={new ScreenService()}
      socketService={socketService}
      readyByClick={true}
    />
  )
}
export const ScreenPage = memo(ScreenPageRaw)
