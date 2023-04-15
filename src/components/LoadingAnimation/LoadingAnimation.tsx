import { memo } from 'react'

import styled from 'styled-components'

import { Logo } from 'components/Icons'

const StyledContainer = styled.div<{ loading: boolean }>`
  svg {
    z-index: 10;
  }
  animation: ${({ loading }) => (!loading ? 'none' : 'pulse 1s infinite')};
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
  loading?: boolean
}
export const LoadingAnimationRaw = ({
  loading = true,
}: LoadingAnimationProps) => {
  return (
    <StyledContainer loading={loading ? true : false}>
      <StyledLogoWrapper>
        <Logo />
      </StyledLogoWrapper>
    </StyledContainer>
  )
}
export const LoadingAnimation = memo(LoadingAnimationRaw)
