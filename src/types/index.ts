export type ProgramType = {
  title: string
  segments: SegmentType[]
}
export type SegmentType = {
  screens: ScreenType[]
  id?: number
  title?: string
  next?: SegmentType[]
  globalAudio?: string
}
export type ScreenType = {
  title: string
  mediaSrc: string
}

export type VideoRefElementType = React.RefObject<HTMLVideoElement> | undefined
export type PlayerContainerType = React.RefObject<HTMLDivElement> | undefined
