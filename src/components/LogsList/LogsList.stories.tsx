import { Story } from '@storybook/react'

import { LogsList } from './LogsList'

export const Default: Story = (args) => {
  return (
    <LogsList
      logs={fakeLogs}
      onResetClick={() => alert(-1)}
      onDownloadClick={() => alert(-1)}
    />
  )
}
Default.storyName = 'LogsList'

export default {
  title: 'LogsList',
}

const fakeLogs: string[] = [
  'voted for new segment 1',
  'voted for new segment 2',
  'voted for new segment 2',
  'voted for new segment 2',
  'voted for new segment 1',
]
