import { withRouter } from 'storybook-addon-react-router-v6'

import { Story } from '@storybook/react'

import { LoadingAnimation } from './LoadingAnimation'

export const Default: Story<{ programId: string }> = (args) => {
  return <LoadingAnimation />
}
Default.storyName = 'LoadingAnimation'

export default {
  title: 'LoadingAnimation',
  decorators: [withRouter],
}
