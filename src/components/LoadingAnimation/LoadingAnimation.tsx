import { memo } from 'react'

import { CircularProgress } from '@mui/material'

export const LoadingAnimationRaw = () => {
  return <CircularProgress />
}
export const LoadingAnimation = memo(LoadingAnimationRaw)
