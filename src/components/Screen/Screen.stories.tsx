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
  id: 5455424651,
  title: 'Program Title #1',
  discription: 'Program discription and something something',
  thumbnail: 'media/somefile.png',
  segments: [],
  media: [],
  amountOfScreens: 3,
}
