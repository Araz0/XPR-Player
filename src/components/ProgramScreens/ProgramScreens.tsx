import { memo } from 'react'

import styled from 'styled-components'

import { Screen } from 'components'

const StyledScreensContainer = styled.div`
  display: flex;
  min-height: 300px;
`

export const ProgramScreensRaw = () => {
  return (
    <StyledScreensContainer>
      <Screen screenId={0} />
      <Screen screenId={1} />
      <Screen screenId={2} />
    </StyledScreensContainer>
  )
}

export const ProgramScreens = memo(ProgramScreensRaw)
