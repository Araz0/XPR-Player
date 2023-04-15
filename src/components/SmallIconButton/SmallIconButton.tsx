import { memo, ReactNode } from 'react'

import { IconButton, Tooltip } from '@mui/material'

export type SmallIconButtonProps = {
  icon: ReactNode
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
        {icon}
      </IconButton>
    </Tooltip>
  )
}
export const SmallIconButton = memo(SmallIconButtonRaw)
