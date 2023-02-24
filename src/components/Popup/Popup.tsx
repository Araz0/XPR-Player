import { memo, useCallback, useEffect, useState } from 'react'

import { createPortal } from 'react-dom'
import styled from 'styled-components'

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

export type PopupProps = {
  onClose: () => void
  children: React.ReactNode
}
export const PopupRaw = ({ onClose, children }: PopupProps) => {
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
        {children}
      </div>
    </StyledContainer>,
    container
  )
}
export const Popup = memo(PopupRaw)
