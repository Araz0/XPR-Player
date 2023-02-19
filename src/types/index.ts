export type ProgramType = {
  id: number
  title: string
  segments: SegmentType[]
}
export type SegmentType = {
  id: number
  title: string
  description: string
  screens: ScreenType[]
  isIntro?: boolean
  nextSegmentIds?: number[]
  globalAudio?: string
}

export type ScreenType = {
  id: number
  title: string
  mediaSrc: string
}

export type VideoRefElementType = React.RefObject<HTMLVideoElement> | undefined
export type PlayerContainerType = React.RefObject<HTMLDivElement> | undefined
