import { memo } from 'react'

import { Add, CopyAll, Delete, Edit, Save } from '@mui/icons-material'
import { IconButton } from '@mui/material'
export enum iconTypes {
  DELETE = 'Delete',
  EDIT = 'Edit',
  ADD = 'Add',
  SAVE = 'Save',
  COPY_ALL = 'CopyAll',
}
export type SmallIconButtonProps = {
  icon: iconTypes
  onClick: () => void
}
export const SmallIconButtonRaw = ({ icon, onClick }: SmallIconButtonProps) => {
  return (
    <IconButton onClick={onClick} size="small">
      {icon === iconTypes.DELETE && <Delete fontSize="small" />}
      {icon === iconTypes.SAVE && <Save fontSize="small" />}
      {icon === iconTypes.EDIT && <Edit fontSize="small" />}
      {icon === iconTypes.ADD && <Add fontSize="small" />}
      {icon === iconTypes.COPY_ALL && <CopyAll fontSize="small" />}
    </IconButton>
  )
}
export const SmallIconButton = memo(SmallIconButtonRaw)
