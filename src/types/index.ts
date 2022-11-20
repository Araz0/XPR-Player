export type programType = {
  title: string
  screens: screenType[]
  audio?: string
}
export type screenType = {
  id: number
  title: string
  sequences: sequenceType[]
  config?: Record<string, unknown> // WIP
}

export type sequenceType = {
  id: number
  name: string
  videoSrc?: string
  options?: sequenceOptionsType[]
}
export type sequenceOptionsType = {
  videoSrc: string
  isDefault?: boolean
}
