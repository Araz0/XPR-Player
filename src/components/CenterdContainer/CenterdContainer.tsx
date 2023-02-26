import { memo } from 'react'

import styled from 'styled-components'

const StyledCenterContainer = styled.div`
  flex: 1;
  display: grid;
  justify-items: center;
  align-items: center;
`

const StyledActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 15px;
  width: fit-content;
  height: fit-content;
`
export type CenterdContainerProps = {
  children: React.ReactNode
}
export const CenterdContainerRaw = ({ children }: CenterdContainerProps) => {
  return (
    <StyledCenterContainer>
      <StyledActionsContainer>{children}</StyledActionsContainer>
    </StyledCenterContainer>
  )
}
export const CenterdContainer = memo(CenterdContainerRaw)
