import { Story } from '@storybook/react'

import { DbProgram } from 'types'

import { ProgramsListDropdown } from './ProgramsListDropdown'

export const Default: Story = (args) => {
  return <ProgramsListDropdown programs={fakePrograms} />
}
Default.storyName = 'ProgramsListDropdown'

export default {
  title: 'ProgramsListDropdown',
}

const fakePrograms: DbProgram[] = [
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
      screensInfo: [{ title: 'Front' }, { title: 'Left' }, { title: 'Back' }],
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
      screensInfo: [{ title: 'Front' }, { title: 'Left' }, { title: 'Back' }],
    },
    user_id: 'someid_asdasdas',
  },
]
