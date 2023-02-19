import { memo, useCallback, useRef } from 'react'

import { QueuePlayNext } from '@mui/icons-material'
import { Divider, IconButton, TextField, Typography } from '@mui/material'

import { useProgram } from '../../hooks'
import { Popup } from '../Popup'
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
        id: new Date().getTime(),
        title: titleRef.current?.value || 'screen title',
        mediaSrc: `/${e.target.files[0].name}`,
      }
      addScreenToSegment(segmentId, screen)
      onClose()
    },
    [addScreenToSegment, segmentId, onClose]
  )
  return (
    <Popup onClose={onClose}>
      <Typography variant="h6">Add screen</Typography>
      <Divider />
      <Typography variant="subtitle1">
        This is a dynamic popup created using portals.
      </Typography>
      <TextField
        inputRef={titleRef}
        placeholder={'screen title'}
        size="small"
      />
      <IconButton color="primary" component="label">
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
