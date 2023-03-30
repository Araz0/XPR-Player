import { Story } from '@storybook/react'

import { Chip } from './Chip'

export const Default: Story = (args) => {
  return <Chip label="something" />
}
Default.storyName = 'Chip'

export default {
  title: 'Chip',
}
