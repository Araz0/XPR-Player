import { forwardRef, memo } from 'react'

import styled from 'styled-components'

const StyledVideo = styled.video`
  width: 100%;
`
export interface VideoProps {
  src: string
}
export const VideoPlayerRaw = forwardRef<HTMLVideoElement>((props, ref) => (
  <StyledVideo ref={ref} />
))

export const VideoPlayer = memo(VideoPlayerRaw)
