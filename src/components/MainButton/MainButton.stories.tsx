import { Story } from '@storybook/react'

import { MainButton, MainButtonVariants } from './MainButton'

export const Default: Story<{ variant: MainButtonVariants }> = (args) => {
  return (
    <MainButton variant={args.variant || MainButtonVariants.BASIC}>
      Custom Button
    </MainButton>
  )
}
Default.storyName = 'MainButton'

Default.args = {
  variant: MainButtonVariants.BASIC,
}

Default.argTypes = {
  variant: {
    options: [
      MainButtonVariants.BASIC,
      MainButtonVariants.PRIMARY,
      MainButtonVariants.SECONDARY,
    ],
    control: { type: 'radio' },
  },
}

export default {
  title: 'MainButton',
}
