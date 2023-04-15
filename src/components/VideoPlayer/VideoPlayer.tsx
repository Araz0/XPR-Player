import { memo } from 'react'

import styled from 'styled-components'

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
`
export type VideoPlayerProps = {
  muted?: boolean
  reference: any
}
export const VideoPlayerRaw = ({ muted, reference }: VideoPlayerProps) => {
  return <StyledVideo ref={reference} muted={muted ? true : false} />
}

export const VideoPlayer = memo(VideoPlayerRaw)
