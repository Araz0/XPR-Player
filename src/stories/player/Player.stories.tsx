import { Story } from '@storybook/react'

export const Default: Story<{ programId: string }> = (args) => {
  return (
    <div>
      <button onClick={() => alert('clicked play')}>play</button>
      <button onClick={() => alert('clicked pause')}>pause</button>
    </div>
  )
}
Default.args = {}
Default.storyName = 'Player'

export default {
  title: 'Player',
}
