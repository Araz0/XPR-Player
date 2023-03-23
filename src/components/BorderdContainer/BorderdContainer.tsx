import { memo, useCallback, useEffect, useState } from 'react'

import styled from 'styled-components'

import {
  PRIMARY_COLOR,
  BACKGROUND_COLOR,
  PRIMARY_GRADIENT,
} from 'constants/styles'

const StyledContainerBorder = styled.div<{ hotBorder: boolean }>`
  border-radius: 10px;
  position: relative;
  background: ${BACKGROUND_COLOR};
  padding: 2px;

  :hover {
    cursor: pointer;
    ${(props) =>
      props.hotBorder
        ? `background: linear-gradient(160deg, ${PRIMARY_GRADIENT});`
        : `background: ${PRIMARY_COLOR};`}
  }
`
const StyledContainer = styled.div`
  background-color: ${BACKGROUND_COLOR};
  border-radius: 8px;
  padding: 1rem;
`

export type BorderdContainerProps = {
  children: React.ReactNode
  hotRef?: React.RefObject<HTMLDivElement>
}
export const BorderdContainerRaw = ({
  children,
  hotRef,
}: BorderdContainerProps) => {
  const [hotHoverd, setHotHoverd] = useState<boolean>(false)

  const handleOnHover = useCallback(() => {
    setHotHoverd(true)
  }, [])
  const handleOnNotHoverd = useCallback(() => {
    setHotHoverd(false)
  }, [])

  useEffect(() => {
    if (!hotRef) return
    hotRef?.current?.addEventListener('mouseenter', handleOnHover)
    hotRef?.current?.addEventListener('mouseleave', handleOnNotHoverd)
    return () => {
      hotRef?.current?.removeEventListener('mouseenter', handleOnHover)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      hotRef?.current?.removeEventListener('mouseleave', handleOnNotHoverd)
    }
  }, [handleOnHover, handleOnNotHoverd, hotRef])

  return (
    <StyledContainerBorder hotBorder={hotHoverd}>
      <StyledContainer>{children}</StyledContainer>
    </StyledContainerBorder>
  )
}

export const BorderdContainer = memo(BorderdContainerRaw)
