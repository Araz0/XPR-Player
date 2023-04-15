import { Story } from '@storybook/react'

import { MediaItem } from './MediaItem'

export const Default: Story = (args) => {
  const fakeMedia = {
    id: -1,
    title: 'Media title',
    description: 'Media description',
    screens: [
      {
        id: 1677693632684,
        title: 's1',
        mediaSrc: '/programMedia/station_test_v001.mp4',
      },
      {
        id: 1677693639455,
        title: 's2',
        mediaSrc: '/programMedia/station_6_proto_v001.mp4',
      },
    ],
  }
  return (
    <MediaItem
      media={fakeMedia}
      onCopy={() => alert('onCopy')}
      onDelete={() => alert('onDelete')}
      onClick={() => alert('onClick')}
    />
  )
}
Default.storyName = 'MediaItem'

export default {
  title: 'MediaItem',
}
