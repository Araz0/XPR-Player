import { memo, useCallback, useRef, useState } from 'react'

import styled from 'styled-components'

import {
  Check,
  Delete,
  Info,
  NavigateBefore,
  NavigateNext,
  QueuePlayNext,
} from '@mui/icons-material'
import { Button, IconButton, TextField, Typography } from '@mui/material'

import { useProgram } from '../../hooks'
import { SegmentMediaType } from '../../types'
import {
  generateNewId,
  shiftItemLeftByIndex,
  shiftItemRightByIndex,
} from '../../utils'
import { Popup } from '../Popup'
import { SmallIconButton } from '../SmallIconButton'

const StyledScreenVideo = styled.video`
  width: 150px;
`
const StyledVideoContainer = styled.div`
  position: relative;
`
const StyledContainer = styled.div`
  position: relative;
  display: flex;
  gap: 3px;
`
const StyledRightActionsContainer = styled.div`
  position: absolute;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
`
const StyledLeftActionsContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
`

export type SegmentScreensProps = {
  media: SegmentMediaType
}
export const SegmentScreensRaw = ({ media }: SegmentScreensProps) => {
  const [showAddScreen, setShowAddScreen] = useState<boolean>(false)

  const screenTitleRef = useRef<HTMLInputElement>()
  const { removeMediaScreen, addScreenToMedia } = useProgram()
  const [screenToBeDeletedId, setScreenToBeDeletedId] = useState<
    number | undefined
  >(undefined)

  const handleDeleteScreen = useCallback(() => {
    if (!screenToBeDeletedId) return
    removeMediaScreen(media, screenToBeDeletedId)
    setScreenToBeDeletedId(undefined)
  }, [media, removeMediaScreen, screenToBeDeletedId])

  const handleAddScreen = useCallback(
    (e: any) => {
      if (!media) return
      const screen = {
        id: generateNewId(),
        title: screenTitleRef.current?.value || 'screen title',
        mediaSrc: `/programMedia/${e.target.files[0].name}`,
      }
      addScreenToMedia(media.id, screen)
      setShowAddScreen(false)
    },
    [addScreenToMedia, media]
  )

  const handleShowAddScreen = useCallback(() => {
    setShowAddScreen(true)
  }, [])

  return (
    <>
      <Typography variant="overline" lineHeight={1} gutterBottom>
        screens:
      </Typography>
      <StyledContainer>
        {media.screens.map((screen, idx) => {
          return (
            <StyledVideoContainer key={idx}>
              <StyledLeftActionsContainer>
                <SmallIconButton
                  tooltip="More Info"
                  onClick={() => alert(screen.title)}
                  icon={<Info fontSize="small" />}
                />
              </StyledLeftActionsContainer>
              <StyledRightActionsContainer>
                {idx > 0 && (
                  <SmallIconButton
                    tooltip="shift left"
                    onClick={() => shiftItemLeftByIndex(media.screens, idx)}
                    icon={<NavigateBefore fontSize="small" />}
                  />
                )}
                {idx < media.screens.length - 1 && (
                  <SmallIconButton
                    tooltip="shift right"
                    onClick={() => shiftItemRightByIndex(media.screens, idx)}
                    icon={<NavigateNext fontSize="small" />}
                  />
                )}
                <SmallIconButton
                  tooltip="Delete Screen"
                  onClick={() => setScreenToBeDeletedId(screen.id)}
                  icon={<Delete fontSize="small" />}
                />
              </StyledRightActionsContainer>

              <StyledScreenVideo src={screen.mediaSrc} controls />
            </StyledVideoContainer>
          )
        })}
      </StyledContainer>
      <Button
        variant="outlined"
        onClick={handleShowAddScreen}
        startIcon={<QueuePlayNext fontSize="small" />}
      >
        Add Screen
      </Button>
      {screenToBeDeletedId && (
        <Popup
          onClose={() => setScreenToBeDeletedId(undefined)}
          header="Delete Segment"
          bodyText="Are you sure you want to delete this segment?"
        >
          <IconButton onClick={handleDeleteScreen}>
            <Check />
          </IconButton>
        </Popup>
      )}
      {showAddScreen && (
        <Popup
          onClose={() => setShowAddScreen(false)}
          header="Add screen"
          bodyText="First give it a title, and then select the video file:"
        >
          <TextField
            inputRef={screenTitleRef}
            placeholder={'screen title'}
            size="small"
          />
          <IconButton component="label">
            <input
              hidden
              accept="video/mp4"
              type="file"
              onChange={handleAddScreen}
            />
            <QueuePlayNext />
          </IconButton>
        </Popup>
      )}
    </>
  )
}
export const SegmentScreens = memo(SegmentScreensRaw)
