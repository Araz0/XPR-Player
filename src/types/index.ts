export type ProgramType = {
  title: string
  segments: SegmentType[]
}
export type SegmentType = {
  id: string
  title: string
  description?: string
  screens: ScreenType[]
  isIntro?: boolean
  nextSegmentIds?: string[]
  globalAudio?: string
}
export type ScreenType = {
  title: string
  mediaSrc: string
}

export type VideoRefElementType = React.RefObject<HTMLVideoElement> | undefined
export type PlayerContainerType = React.RefObject<HTMLDivElement> | undefined
