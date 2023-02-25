export type ProgramType = {
  id: number
  title: string
  segments: SegmentType[]
  amountOfScreens: number
  standBySrc?: string
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

export type DbProgram = {
  id: number
  internal_id: number
  program: ProgramType
  user_id: string
}

export enum ScreenStatus {
  EMPTY = 'EMPTY',
  HAS_PROGRAM = 'HAS_PROGRAM',
  STAND_BY = 'STAND_BY',
  PLAYING = 'PLAYING',
  VOTING = 'VOTING',
  PAUSED = 'PAUSED',
  STOPPED = 'STOPPED',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}
