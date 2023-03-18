import { useCallback } from 'react'

import { withRouter } from 'storybook-addon-react-router-v6'

import { Story } from '@storybook/react'
import { Screen } from 'components/Screen'

import { useScreenStore } from 'stores'

export const Default: Story = (args) => {
  const setProgram = useScreenStore((s) => s.setProgram)
  const handleSetProgram = useCallback(() => {
    // set program
    setProgram(fakeProgram)
  }, [setProgram])

  return (
    <>
      <button onClick={handleSetProgram}>set Program</button>
      <Screen screenId={0} />
    </>
  )
}
Default.args = {}
Default.storyName = 'Screen'

export default {
  title: 'Screen',
  decorators: [withRouter],
}

const fakeProgram = {
  id: 1677693601955,
  title: 'program demo v2 edited',
  amountOfScreens: 2,
  segments: [
    {
      id: 1677693602036,
      mediaId: 1677693618589,
      isIntro: true,
      nextSegmentIds: [1677693648281, 1677775597109],
    },
    {
      id: 1677693648281,
      mediaId: 1677693659267,
    },
    {
      id: 1677775597109,
      mediaId: 1677775611105,
    },
  ],
  media: [
    {
      id: 1677693618589,
      title: 'teo intro',
      description: 'No description',
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
      id: 1677693659267,
      title: 'something nice',
      description: 'idk',
      screens: [
        {
          id: 1677693673731,
          title: 's1',
          mediaSrc: '/programMedia/station_6_proto_v001.mp4',
        },
        {
          id: 1677693679469,
          title: 's2',
          mediaSrc: '/programMedia/station_test_v001.mp4',
        },
      ],
    },
    {
      id: 1677775611105,
      title: 'different path',
      description: 'something new',
      screens: [
        {
          id: 1677775628155,
          title: 'screen title',
          mediaSrc: '/programMedia/Audio Video Sync Test 60 FPS.mp4',
        },
        {
          id: 1677775652492,
          title: 's2',
          mediaSrc: '/programMedia/60fps_Tester.mp4',
        },
      ],
    },
  ],
}
