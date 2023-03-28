import { memo, useCallback, useEffect, useState } from 'react'

import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { Close } from '@mui/icons-material'
import { Typography, IconButton } from '@mui/material'
import {
  WHITE_COLOR,
  BACKGROUND_COLOR_PRIMERY,
  PRIMARY_COLOR,
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
    border: 1px solid;
    padding: 20px;
    border-radius: 5px;
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
  display: flex;
  justify-content: end;
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
  bodyText: string
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
      <div className="popup-content" onClick={handlePopUpClick}>
        <StyledExitContainer>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </StyledExitContainer>
        <StyledHeader>
          {header && <Typography variant="h6">{header}</Typography>}
          {bodyText && <Typography variant="subtitle1">{bodyText}</Typography>}
        </StyledHeader>
        <StyledActionsContainer fullWidth={fullWidth}>
          {children}
        </StyledActionsContainer>
      </div>
    </StyledContainer>,
    container
  )
}
export const Popup = memo(PopupRaw)
