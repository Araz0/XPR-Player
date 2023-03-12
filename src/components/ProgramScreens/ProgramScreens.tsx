import { memo, useEffect } from 'react'

import styled from 'styled-components'

import { Typography } from '@mui/material'

import { CenterdContainer, Screen } from '../../components'
import { useScreenService } from '../../services'
import { useScreenStore } from '../../stores'

const StyledScreensContainer = styled.div`
  display: flex;
  min-height: 300px;
`

export const ProgramScreensRaw = () => {
  const { setScerenListeners } = useScreenService()
  const program = useScreenStore((s) => s.program)

  useEffect(() => {
    setScerenListeners()
  }, [setScerenListeners])

  if (!program)
    return (
      <CenterdContainer>
        <Typography>No program was selected</Typography>
      </CenterdContainer>
    )
  return (
    <StyledScreensContainer>
      <Screen screenId={0} />
      <Screen screenId={1} />
    </StyledScreensContainer>
  )
}

export const ProgramScreens = memo(ProgramScreensRaw)
