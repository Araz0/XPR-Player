import { memo } from 'react'

import { AddToQueue } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export type SegmentScreenProps = {
  onUpload: (e: any) => void
}
export const SegmentScreenRaw = ({ onUpload }: SegmentScreenProps) => {
  return (
    <>
      <IconButton color="primary" component="label">
        <input hidden accept="video/mp4" type="file" onChange={onUpload} />
        <AddToQueue /> {/* QueuePlayNext */}
      </IconButton>
    </>
  )
}
export const SegmentScreen = memo(SegmentScreenRaw)
