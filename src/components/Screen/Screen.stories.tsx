import { useCallback } from 'react'

import { withRouter } from 'storybook-addon-react-router-v6'
import styled from 'styled-components'

import { Story } from '@storybook/react'
import { Screen } from 'components/Screen'

import { useScreenStore } from 'stores'

const StyledContainer = styled.div`
  height: 310px;
  width: 555px;
  display: flex;
`

export const Default: Story = (args) => {
  const setProgram = useScreenStore((s) => s.setProgram)
  const handleSetProgram = useCallback(() => {
    // set program
    setProgram(fakeProgram)
  }, [setProgram])

  return (
    <>
      <button onClick={handleSetProgram}>set Program</button>
      <StyledContainer>
        <Screen screenId={0} />
      </StyledContainer>
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
  screensInfo: [{ title: 'Front' }, { title: 'Left' }, { title: 'Back' }],
}
