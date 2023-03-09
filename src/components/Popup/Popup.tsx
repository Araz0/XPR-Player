import { memo, useCallback, useEffect, useState } from 'react'

import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { Close } from '@mui/icons-material'
import { Typography, IconButton, Divider } from '@mui/material'

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .popup-content {
    border: 1px solid;
    padding: 20px;
    border-radius: 5px;
    background-color: #212121;
  }
  .popup-content > * {
    margin-bottom: 10px;
  }
`
const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export type PopupProps = {
  onClose: () => void
  header: string
  bodyText: string
  children: React.ReactNode
}
export const PopupRaw = ({
  onClose,
  header,
  bodyText,
  children,
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
        {header && (
          <>
            <StyledHeaderContainer>
              <Typography variant="h6">{header}</Typography>
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            </StyledHeaderContainer>
            <Divider />
          </>
        )}
        {bodyText && <Typography variant="subtitle1">{bodyText}</Typography>}
        <StyledActionsContainer>{children}</StyledActionsContainer>
      </div>
    </StyledContainer>,
    container
  )
}
export const Popup = memo(PopupRaw)
