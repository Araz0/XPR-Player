import { Story } from '@storybook/react'

import { ProgramsItem } from './ProgramsItem'

export const Default: Story = (args) => {
  return (
    <ProgramsItem
      title="Programs Item Title"
      description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
          quasi ut consequuntur."
      tags={['tag1', '3 Screens', '7-12 Minutes']}
      thumbnail="media/thumbnailFallback.jpg"
      onEdit={() => alert('onEdit')}
      onCopy={() => alert('onCopy')}
      onDownload={() => alert('onDownload')}
      onDelete={() => alert('onDelete')}
    />
  )
}
Default.storyName = 'ProgramsItem'

export default {
  title: 'ProgramsItem',
}
