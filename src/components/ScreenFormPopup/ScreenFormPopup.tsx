import { memo, useCallback, useRef } from 'react'

import styled from 'styled-components'

import { QueuePlayNext, Close } from '@mui/icons-material'
import { Divider, IconButton, TextField, Typography } from '@mui/material'

import { useProgram } from '../../hooks'
import { generateNewId } from '../../utils'
import { Popup } from '../Popup'

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export type ScreenFormPopupProps = {
  segmentId: number
  onClose: () => void
}
export const ScreenFormPopupRaw = ({
  segmentId,
  onClose,
}: ScreenFormPopupProps) => {
  const titleRef = useRef<HTMLInputElement>()
  const { addScreenToSegment } = useProgram()
  const handleImportScreen = useCallback(
    (e: any) => {
      const screen = {
        id: generateNewId(),
        title: titleRef.current?.value || 'screen title',
        mediaSrc: `/programMedia/${e.target.files[0].name}`,
      }
      addScreenToSegment(segmentId, screen)
      onClose()
    },
    [addScreenToSegment, onClose, segmentId]
  )
  return (
    <Popup onClose={onClose}>
      <StyledHeaderContainer>
        <Typography variant="h6">Add screen</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </StyledHeaderContainer>
      <Divider />
      <Typography variant="subtitle1">
        First give it a title, and then select the video file.
      </Typography>
      <TextField
        inputRef={titleRef}
        placeholder={'screen title'}
        size="small"
      />
      <IconButton component="label">
        <input
          hidden
          accept="video/mp4"
          type="file"
          onChange={handleImportScreen}
        />
        <QueuePlayNext />
      </IconButton>
    </Popup>
  )
}
export const ScreenFormPopup = memo(ScreenFormPopupRaw)
