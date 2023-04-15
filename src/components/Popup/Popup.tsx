import { memo, useCallback, useEffect, useState } from 'react'

import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { Close } from '@mui/icons-material'
import { Typography, IconButton, Divider, ThemeProvider } from '@mui/material'
import { BorderdContainer } from 'components/BorderdContainer'
import {
  WHITE_COLOR,
  BACKGROUND_COLOR_PRIMERY,
  PRIMARY_COLOR,
  lightTheme,
} from 'constants/styles'

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  .popup-content {
    position: relative;
    padding: 40px;
    border-radius: 10px;
    background-color: ${WHITE_COLOR};
    color: ${BACKGROUND_COLOR_PRIMERY};
  }
  .popup-content > * {
    margin-bottom: 10px;
  }
  button {
    color: ${PRIMARY_COLOR};
  }
`
const StyledExitContainer = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
`
const StyledHeader = styled.div`
  text-align: center;
`

const StyledActionsContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.fullWidth ? '100%' : 'fit-content')};
`

export type PopupProps = {
  onClose: () => void
  header: string
  bodyText?: string
  children: React.ReactNode
  fullWidth?: boolean
}
export const PopupRaw = ({
  onClose,
  header,
  bodyText,
  children,
  fullWidth,
}: PopupProps) => {
  const [container, setContainer] = useState<HTMLDivElement | undefined>()

  const handleOnClose = useCallback(
    (e: any) => {
      onClose && onClose()
    },
    [onClose]
  )
  const handlePopUpClick = useCallback((e: any) => {
    e.stopPropagation()
  }, [])
  // Create a new container element on mount
  useEffect(() => {
    const newContainer = document.createElement('div')
    const root = document.getElementById('root')
    root
      ? root.appendChild(newContainer)
      : document.body.appendChild(newContainer)

    setContainer(newContainer)
  }, [])
  if (!container) return null
  return createPortal(
    <StyledContainer onClick={handleOnClose}>
      <BorderdContainer
        hotBorder={true}
        isSelected={true}
        padding="0"
        noHoverCursor={true}
      >
        <div className="popup-content" onClick={handlePopUpClick}>
          <StyledExitContainer>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </StyledExitContainer>
          <StyledHeader>
            {header && <Typography variant="h6">{header}</Typography>}
            {bodyText && (
              <Typography variant="subtitle1">{bodyText}</Typography>
            )}
          </StyledHeader>
          <Divider />
          <StyledActionsContainer fullWidth={fullWidth}>
            <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
          </StyledActionsContainer>
        </div>
      </BorderdContainer>
    </StyledContainer>,
    container
  )
}
export const Popup = memo(PopupRaw)
