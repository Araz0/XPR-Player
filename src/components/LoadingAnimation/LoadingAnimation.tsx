import { memo } from 'react'

import styled from 'styled-components'

import { Logo } from 'components/Icons'

const StyledContainer = styled.div<{ isLoading: boolean }>`
  svg {
    z-index: 10;
  }
  animation: ${({ isLoading }) => (!isLoading ? 'none' : 'pulse 1s infinite')};
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }
`
const StyledLogoWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`

export type LoadingAnimationProps = {
  isLoading?: boolean
}
export const LoadingAnimationRaw = ({
  isLoading = true,
}: LoadingAnimationProps) => {
  return (
    <StyledContainer isLoading={isLoading}>
      <StyledLogoWrapper>
        <Logo />
      </StyledLogoWrapper>
    </StyledContainer>
  )
}
export const LoadingAnimation = memo(LoadingAnimationRaw)
