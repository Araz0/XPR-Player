import { Story } from '@storybook/react'

import { SegmentMediaType } from 'types'

import { MediaList } from './MediaList'

export const Default: Story = (args) => {
  return <MediaList mediaArray={fakeMedia} />
}
Default.storyName = 'MediaList'

export default {
  title: 'MediaList',
}

const fakeMedia: SegmentMediaType[] = [
  {
    id: -1,
    title: 'Media title 1',
    description: 'Media description 1',
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
  },
  {
    id: -2,
    title: 'Media title 2',
    description: 'Media description 2',
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
  },
]
