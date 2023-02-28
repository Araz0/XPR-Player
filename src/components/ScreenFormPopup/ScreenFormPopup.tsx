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
  mediatId: number
  onClose: () => void
}
export const ScreenFormPopupRaw = ({
  mediatId,
  onClose,
}: ScreenFormPopupProps) => {
  const titleRef = useRef<HTMLInputElement>()
  const { addScreenToMedia } = useProgram()
  const handleImportScreen = useCallback(
    (e: any) => {
      const screen = {
        id: generateNewId(),
        title: titleRef.current?.value || 'screen title',
        mediaSrc: `/programMedia/${e.target.files[0].name}`,
      }
      addScreenToMedia(mediatId, screen)
      onClose()
    },
    [addScreenToMedia, onClose, mediatId]
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
