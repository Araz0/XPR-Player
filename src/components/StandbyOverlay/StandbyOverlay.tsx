import { memo } from 'react'

import styled from 'styled-components'

const StyledCenterContainer = styled.div<{ backgroundColor?: string }>`
  flex: 1;
  display: grid;
  justify-items: center;
  align-items: center;
  z-index: 100;
  color: white;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : 'rgba(1, 0, 0, 1)'};
`

const StyledActionsContainer = styled.div`q
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 15px;
  width: fit-content;
  height: fit-content;
`
export type StandbyOverlayProps = {
  children: React.ReactNode
  backgroundColor?: string
}
export const StandbyOverlayRaw = ({
  children,
  backgroundColor,
}: StandbyOverlayProps) => {
  return (
    <StyledCenterContainer backgroundColor={backgroundColor}>
      <StyledActionsContainer>{children}</StyledActionsContainer>
    </StyledCenterContainer>
  )
}
export const StandbyOverlay = memo(StandbyOverlayRaw)
