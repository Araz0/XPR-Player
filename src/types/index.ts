export type ProgramType = {
  title: string
  sequences: SequenceType[]
}
export type SequenceType = {
  screens: ScreenType[]
  id?: number
  title?: string
  next?: SequenceType[]
  globalAudio?: string
}
export type ScreenType = {
  title: string
  mediaSrc: string
}

export type VideoRefElementType = React.RefObject<HTMLVideoElement> | undefined
export type PlayerContainerType = React.RefObject<HTMLDivElement> | undefined
