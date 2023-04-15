import { Story } from '@storybook/react'

import { EventLog } from 'types'

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

const fakeLogs: EventLog[] = [
  { event: 'set-program', timestamp: 1681515560468 },
  { event: 'set-program', timestamp: 1681515560568 },
  { event: 'set-program', timestamp: 1681515560448 },
]
