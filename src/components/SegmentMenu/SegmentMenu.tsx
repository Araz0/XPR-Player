import { memo, useCallback, useRef, useState } from 'react'

import {
  Check,
  ContentPaste,
  CopyAll,
  Delete,
  MoreVert,
} from '@mui/icons-material'
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material'
import { Popup } from 'components/Popup'

import { useProgram } from 'hooks'
import { SegmentMediaType } from 'types'

export type SegmentMenuProps = {
  segmentId: number
  media?: SegmentMediaType
}
export const SegmentMenuRaw = ({ segmentId, media }: SegmentMenuProps) => {
  const { removeSegment, addNextSegmentById } = useProgram()

  const [showPasteId, setShowPasteId] = useState<boolean>(false)
  const [showDeleteSegment, setShowDeleteSegment] = useState<boolean>(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const pasteSegmentIdRef = useRef<HTMLInputElement>()

  const handleAddSegmentById = useCallback(() => {
    const inputValue = pasteSegmentIdRef.current
      ? parseInt(pasteSegmentIdRef.current.value)
      : -1
    addNextSegmentById(segmentId, inputValue)
    setShowPasteId(false)
    handleClose()
  }, [addNextSegmentById, segmentId])

  const handlePasteId = useCallback(() => {
    setShowPasteId(true)
    handleClose()
  }, [])

  const handleCopyId = useCallback(() => {
    navigator.clipboard.writeText(segmentId.toString())
    handleClose()
  }, [segmentId])

  const handleShowDeleteSegment = useCallback(() => {
    setShowDeleteSegment(true)
    handleClose()
  }, [])

  const handleDeleteSegment = useCallback(() => {
    removeSegment(segmentId)
    setShowDeleteSegment(false)
    handleClose()
  }, [removeSegment, segmentId])

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={menuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : undefined}
        onClick={handleClick}
        size="small"
      >
        <MoreVert fontSize="small" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handlePasteId}>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste Segment ID</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCopyId}>
          <ListItemIcon>
            <CopyAll fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy Segment Id</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleShowDeleteSegment}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete Segment</ListItemText>
        </MenuItem>
      </Menu>

      {showDeleteSegment && (
        <Popup
          onClose={() => setShowDeleteSegment(false)}
          header="Delete Segment"
          bodyText="Are you sure you want to delete this segment?"
        >
          <IconButton onClick={handleDeleteSegment}>
            <Check />
          </IconButton>
        </Popup>
      )}
      {showPasteId && (
        <Popup
          onClose={() => setShowPasteId(false)}
          header="Paste Segment"
          bodyText="Paste The Segment ID here:"
        >
          <TextField
            inputRef={pasteSegmentIdRef}
            placeholder={'Segment Id'}
            size="small"
          />
          <div>
            <IconButton onClick={handleAddSegmentById}>
              <Check />
            </IconButton>
          </div>
        </Popup>
      )}
    </div>
  )
}
export const SegmentMenu = memo(SegmentMenuRaw)
