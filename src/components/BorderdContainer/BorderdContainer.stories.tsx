import { useRef } from 'react'

import { Story } from '@storybook/react'

import { BorderdContainer } from './BorderdContainer'

export const Default: Story = (args) => {
  const btnsRef = useRef<any>(null)

  return (
    <BorderdContainer hotRef={btnsRef}>
      <div>
        <button>button 1</button>
      </div>
      <button ref={btnsRef}>This gives a special hover</button>
    </BorderdContainer>
  )
}
Default.storyName = 'SpecialContainerBorder'

export default {
  title: 'SpecialContainerBorder',
}
