import { withRouter } from 'storybook-addon-react-router-v6'

import { Story } from '@storybook/react'

import { SegmentMenu } from './SegmentMenu'

export const Default: Story<{ programId: string }> = (args) => {
  return (
    <SegmentMenu
      segmentId={-1}
      media={{
        id: 566,
        title: 'media title',
        description: 'media description',
        screens: [],
      }}
    />
  )
}
Default.args = {}
Default.storyName = 'SegmentMenu'

export default {
  title: 'SegmentMenu',
  decorators: [withRouter],
}
