import { memo } from 'react'

export const ScreenRaw = () => {
  return (
    <>
      <video controls />
    </>
  )
}

export const Screen = memo(ScreenRaw)
