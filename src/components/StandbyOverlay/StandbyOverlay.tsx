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

const StyledActionsContainer = styled.div<{ clickable?: boolean }>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: fit-content;
  height: fit-content;

  transition: transform 250ms;

  ${({ clickable }) => clickable && 'cursor: pointer;'}
  ${({ clickable }) => clickable && ':hover{ transform: scale(0.9);}'}
`
export type StandbyOverlayProps = {
  children: React.ReactNode
  backgroundColor?: string
  onClick?: () => void
}
export const StandbyOverlayRaw = ({
  children,
  backgroundColor,
  onClick,
}: StandbyOverlayProps) => {
  return (
    <StyledCenterContainer backgroundColor={backgroundColor} onClick={onClick}>
      <StyledActionsContainer clickable={onClick ? true : false}>
        {children}
      </StyledActionsContainer>
    </StyledCenterContainer>
  )
}
export const StandbyOverlay = memo(StandbyOverlayRaw)
