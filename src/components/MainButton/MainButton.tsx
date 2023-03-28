import { memo } from 'react'

import styled from 'styled-components'

import {
  WHITE_COLOR,
  SECONDARY_COLOR,
  PRIMARY_COLOR,
  PRIMARY_COLOR_HOVERD,
  SECONDARY_COLOR_HOVERD,
} from 'constants/styles'

export enum MainButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  BASIC = 'basic',
}

const StyledButton = styled.button<{ variant?: string; width?: string }>`
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
  padding: ${(props) => (props.width ? '2px 15px' : '6px 32px')};
  gap: 10px;

  width: ${(props) => props.width || '180px'};
  ${(props) => !props.width && 'height: 36px;'}

  border: ${(props) =>
    props.variant === MainButtonVariants.BASIC
      ? '1.5px solid #f2f0ff'
      : 'none'};

  border-radius: 4px;

  cursor: pointer;

  :hover {
    background-color: ${(props) =>
      props.variant === MainButtonVariants.PRIMARY
        ? PRIMARY_COLOR_HOVERD
        : props.variant === MainButtonVariants.SECONDARY
        ? SECONDARY_COLOR_HOVERD
        : 'transparent'};
  }
`

export type MainButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  variant?: MainButtonVariants
  startIcon?: React.ReactNode
  endtIcon?: React.ReactNode
  width?: string
}
export const MainButtonRaw = ({
  children,
  onClick,
  variant,
  startIcon,
  endtIcon,
  width,
}: MainButtonProps) => {
  return (
    <StyledButton
      variant={variant ? variant : MainButtonVariants.BASIC}
      onClick={onClick}
      width={width}
    >
      {startIcon}
      {children}
      {endtIcon}
    </StyledButton>
  )
}

export const MainButton = memo(MainButtonRaw)
