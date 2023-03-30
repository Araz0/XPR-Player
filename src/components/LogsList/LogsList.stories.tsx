import { Story } from '@storybook/react'

import { LogType } from 'types'

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

const fakeLogs: LogType[] = [
  { title: 'user1', description: 'voted for new segment 1' },
  { title: 'user3', description: 'voted for new segment 2' },
  { title: 'user2', description: 'voted for new segment 2' },
  { title: 'user3', description: 'voted for new segment 2' },
  { title: 'user1', description: 'voted for new segment 1' },
]
