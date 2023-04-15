import { memo, useCallback, useEffect, useState } from 'react'

import styled from 'styled-components'

import {
  PRIMARY_COLOR,
  BACKGROUND_COLOR_SECONDERY,
  PRIMARY_GRADIENT,
} from 'constants/styles'

const StyledContainerBorder = styled.div<{
  hotBorder: boolean
  isSelected?: boolean
  fitContent?: boolean
  isFullScreen?: boolean
  noHoverCursor?: boolean
  width?: string
  height?: string
}>`
  border-radius: 10px;
  position: ${(props) => (props.isFullScreen ? 'absolute' : 'relative')};
  ${(props) => props.isFullScreen && `z-index: 500;`}
  background: ${BACKGROUND_COLOR_SECONDERY};
  padding: 2px;

  ${(props) => props.isSelected && `background: ${PRIMARY_COLOR};`}

  height: ${(props) =>
    props.height
      ? props.height
      : props.fitContent || !props.isFullScreen
      ? 'fit-content'
      : '643px'};
  width: ${(props) =>
    props.width
      ? props.width
      : props.fitContent || !props.isFullScreen
      ? 'fit-content'
      : '1133px'};

  :hover {
    ${(props) => props.noHoverCursor !== true && `cursor: pointer;`}

    ${(props) =>
      props.hotBorder
        ? `background: linear-gradient(160deg, ${PRIMARY_GRADIENT});`
        : `background: ${PRIMARY_COLOR};`}
  }
`
const StyledContainer = styled.div<{
  isSelected?: boolean
  padding?: string
}>`
  ${(props) =>
    `background-color: ${
      props.isSelected ? PRIMARY_COLOR : BACKGROUND_COLOR_SECONDERY
    };`}

  border-radius: 8px;
  padding: ${(props) => (props.padding ? props.padding : '1rem')};
  height: 100%;
`

export type BorderdContainerProps = {
  children: React.ReactNode
  hotRef?: React.RefObject<HTMLDivElement>
  isSelected?: boolean
  padding?: string
  fitContent?: boolean
  hotBorder?: boolean
  onClick?: () => void
  isFullScreen?: boolean
  noHoverCursor?: boolean
  width?: string
  height?: string
}
export const BorderdContainerRaw = ({
  children,
  hotRef,
  isSelected,
  padding,
  fitContent,
  hotBorder,
  onClick,
  isFullScreen,
  noHoverCursor,
  width,
  height,
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
    <StyledContainerBorder
      hotBorder={hotBorder || hotHoverd}
      isSelected={isSelected}
      fitContent={fitContent}
      onClick={onClick}
      isFullScreen={isFullScreen}
      noHoverCursor={noHoverCursor}
      width={width}
      height={height}
    >
      <StyledContainer isSelected={isSelected} padding={padding}>
        {children}
      </StyledContainer>
    </StyledContainerBorder>
  )
}

export const BorderdContainer = memo(BorderdContainerRaw)
