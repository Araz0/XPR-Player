import { withRouter } from 'storybook-addon-react-router-v6'

import { Story } from '@storybook/react'

import { TreeItem } from './TreeItem'

export const Default: Story<{ programId: string }> = (args) => {
  return <TreeItem segmentId={-1} />
}
Default.args = {}
Default.storyName = 'TreeItem'

export default {
  title: 'TreeItem',
  decorators: [withRouter],
}
