import { memo } from 'react'

import styled from 'styled-components'

import { WHITE_COLOR, SECONDARY_COLOR, PRIMARY_COLOR } from 'constants/styles'

export enum MainButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  BASIC = 'basic',
}

const StyledButton = styled.button<{ variant?: string }>`
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  background-color: ${(props) =>
    props.variant === MainButtonVariants.PRIMARY
      ? PRIMARY_COLOR
      : props.variant === MainButtonVariants.SECONDARY
      ? SECONDARY_COLOR
      : 'transparent'};

  color: ${WHITE_COLOR};

  font-weight: bold;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 32px;
  gap: 10px;

  width: 199px;
  height: 36px;

  border: ${(props) =>
    props.variant === MainButtonVariants.BASIC
      ? '1.5px solid #f2f0ff'
      : 'none'};

  border-radius: 4px;

  cursor: pointer;
`

export type MainButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  variant?: MainButtonVariants
}
export const MainButtonRaw = ({
  children,
  onClick,
  variant,
}: MainButtonProps) => {
  return (
    <StyledButton variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export const MainButton = memo(MainButtonRaw)
