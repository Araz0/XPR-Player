import { memo, useCallback, useRef, useState } from 'react'

import styled from 'styled-components'

import { DeleteOutline, FileCopyOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { BorderdContainer } from 'components/BorderdContainer'
import { WHITE_COLOR } from 'constants/styles'

import { SegmentMediaType } from 'types'

const StyledChildrenContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  color: ${WHITE_COLOR};
`

const StyledActionsContainer = styled.div`
  display: flex;
  justify-self: end;
`

const StyledDescriptionContainer = styled.div`
  padding: 0 15px;
`

const StyledScreen = styled.video<{ isOnTop: boolean }>`
  position: absolute;
  width: 120px;
  height: 60px;
  border-radius: 4px;
  object-fit: cover;
  border: 1px solid ${WHITE_COLOR};

  ${(props) => props.isOnTop && 'z-index: 100;'}
`
const StyledScreensContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 120px;
  height: 60px;
`
const StyledScreensPaginationContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 7px;
  justify-content: center;
`
const StyledPaginationButton = styled.button<{ isSelected: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  ${(props) => props.isSelected && 'opacity: 0.5;'}
`

export type MediaItemProps = {
  media: SegmentMediaType
  onCopy: () => void
  onDelete: () => void
  onClick: () => void
  isSelected?: boolean
}

export const MediaItemRaw = ({
  media,
  onCopy,
  onDelete,
  onClick,
  isSelected,
}: MediaItemProps) => {
  const btnsRef = useRef<HTMLDivElement>(null)
  const [shownScreen, setShownScreen] = useState<number>(0)

  const handleOnClick = useCallback((e: any) => {
    e.stopPropagation()
  }, [])

  const handleOnSwitchScreenClick = useCallback((e: any, idx: number) => {
    e.stopPropagation()
    setShownScreen(idx)
  }, [])

  return (
    <BorderdContainer hotRef={btnsRef} isSelected={isSelected}>
      <StyledChildrenContainer onClick={onClick}>
        <div>
          <StyledScreensContainer onClick={handleOnClick}>
            {media.screens.map((screen, idx) => {
              return (
                <StyledScreen
                  controls
                  src={screen.mediaSrc}
                  isOnTop={shownScreen === idx}
                  key={idx}
                />
              )
            })}
          </StyledScreensContainer>
          <StyledScreensPaginationContainer>
            {media.screens.map((screen, idx) => {
              return (
                <StyledPaginationButton
                  onClick={(e) => handleOnSwitchScreenClick(e, idx)}
                  isSelected={shownScreen === idx}
                  key={idx}
                />
              )
            })}
          </StyledScreensPaginationContainer>
        </div>
        <StyledDescriptionContainer>
          <p>{media.title}</p>
          <p>{media.description}</p>
        </StyledDescriptionContainer>
        <StyledDescriptionContainer>
          <p>00:35</p>
          <p>2 times used</p>
        </StyledDescriptionContainer>
        <StyledActionsContainer ref={btnsRef} onClick={handleOnClick}>
          <IconButton onClick={onCopy} style={{ color: WHITE_COLOR }}>
            <FileCopyOutlined />
          </IconButton>
          <IconButton onClick={onDelete} style={{ color: WHITE_COLOR }}>
            <DeleteOutline />
          </IconButton>
        </StyledActionsContainer>
      </StyledChildrenContainer>
    </BorderdContainer>
  )
}

export const MediaItem = memo(MediaItemRaw)
