import styled from 'styled-components'

import { Story } from '@storybook/react'

import { ScreensList } from './ScreensList'

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
`
const fakeScreens = [
  { title: 'screen #1 left screen' },
  { title: 'screen #2 center screen' },
  { title: 'screen #3 right screen' },
]

export const Default: Story = (args) => {
  return (
    <StyledContainer>
      <ScreensList programScreens={fakeScreens} />
    </StyledContainer>
  )
}
Default.args = {}
Default.storyName = 'ScreensList'

export default {
  title: 'ScreensList',
}
