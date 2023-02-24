import { memo } from 'react'

import {
  Add,
  Check,
  CopyAll,
  Delete,
  Edit,
  EditOff,
  ExpandLess,
  ExpandMore,
  Info,
  QueuePlayNext,
  Save,
} from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
export enum iconTypes {
  DELETE = 'Delete',
  EDIT = 'Edit',
  EDIT_OFF = 'EditOff',
  ADD = 'Add',
  SAVE = 'Save',
  COPY_ALL = 'CopyAll',
  INFO = 'Info',
  QUEUE_PLAY_NEXT = 'QueuePlayNext',
  EXPAND_MORE = 'ExpandMore',
  EXPAND_LESS = 'ExpandLess',
  CHECK = 'Check',
}
export type SmallIconButtonProps = {
  icon: iconTypes
  onClick: () => void
  tooltip: string
}
export const SmallIconButtonRaw = ({
  icon,
  onClick,
  tooltip,
}: SmallIconButtonProps) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton onClick={onClick} size="small">
        {icon === iconTypes.DELETE && <Delete fontSize="small" />}
        {icon === iconTypes.SAVE && <Save fontSize="small" />}
        {icon === iconTypes.EDIT && <Edit fontSize="small" />}
        {icon === iconTypes.ADD && <Add fontSize="small" />}
        {icon === iconTypes.COPY_ALL && <CopyAll fontSize="small" />}
        {icon === iconTypes.INFO && <Info fontSize="small" />}
        {icon === iconTypes.QUEUE_PLAY_NEXT && (
          <QueuePlayNext fontSize="small" />
        )}
        {icon === iconTypes.EDIT_OFF && <EditOff fontSize="small" />}
        {icon === iconTypes.EXPAND_MORE && <ExpandMore fontSize="small" />}
        {icon === iconTypes.EXPAND_LESS && <ExpandLess fontSize="small" />}
        {icon === iconTypes.CHECK && <Check fontSize="small" />}
      </IconButton>
    </Tooltip>
  )
}
export const SmallIconButton = memo(SmallIconButtonRaw)
