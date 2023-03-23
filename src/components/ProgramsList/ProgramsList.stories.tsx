import { withRouter } from 'storybook-addon-react-router-v6'

import { Story } from '@storybook/react'

import { ProgramsList } from './ProgramsList'

export const Default: Story = (args) => {
  return <ProgramsList programs={fakePrograms} />
}
Default.storyName = 'ProgramsList'

export default {
  title: 'ProgramsList',
  decorators: [withRouter],
}

const fakePrograms = [
  {
    id: 0,
    internal_id: 56,
    program: {
      id: 5455424651,
      title: 'Program Title #1',
      discription: 'Program discription and something something',
      thumbnail: 'media/somefile.png',
      segments: [],
      media: [],
      amountOfScreens: 3,
    },
    user_id: 'someid_asdsadsa',
  },
  {
    id: 1,
    internal_id: 53,
    program: {
      id: 545654651,
      title: 'Program Title #2',
      discription: 'Program discription and something different',
      thumbnail: 'media/somefile.png',
      segments: [],
      media: [],
      amountOfScreens: 5,
    },
    user_id: 'someid_asdasdas',
  },
]
