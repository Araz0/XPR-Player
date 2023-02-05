import { memo } from 'react'

import { Screen } from '../../components'

export const ScreenPageRaw = () => {
  return <Screen controls />
}
export const ScreenPage = memo(ScreenPageRaw)
