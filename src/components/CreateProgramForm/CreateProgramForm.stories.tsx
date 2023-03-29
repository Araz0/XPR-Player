import { withRouter } from 'storybook-addon-react-router-v6'

import { Story } from '@storybook/react'

import { CreateProgramForm } from './CreateProgramForm'

export const Default: Story = (args) => {
  return <CreateProgramForm />
}
Default.storyName = 'CreateProgramForm'

export default {
  title: 'CreateProgramForm',
  decorators: [withRouter],
}
