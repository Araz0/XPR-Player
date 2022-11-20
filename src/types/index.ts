export type programType = {
  title: string
  screens: screenType[]
  audio?: string
}
export type screenType = {
  id: number
  title: string
  videoSrc: string
  config?: Record<string, unknown>
}
