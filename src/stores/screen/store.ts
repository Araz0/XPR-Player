import { create } from 'zustand'

import { ProgramType } from 'types'

export type ScreenState = {
  program: ProgramType | undefined
  setProgram: (program: ProgramType | undefined) => void

  programStarted: boolean
  setProgramStarted: (programStarted: boolean) => void

  showControls: boolean
  setShowControls: (showControls: boolean) => void

  showIdentification: boolean
  setShowIdentification: (showIdentification: boolean) => void
}

export const useScreenStore = create<ScreenState>((set) => ({
  program: undefined,
  setProgram: (program: ProgramType | undefined) => set(() => ({ program })),

  programStarted: false,
  setProgramStarted: (programStarted: boolean) =>
    set(() => ({ programStarted })),

  showControls: false,
  setShowControls: (showControls: boolean) => set(() => ({ showControls })),

  showIdentification: false,
  setShowIdentification: (showIdentification: boolean) =>
    set(() => ({ showIdentification })),
}))
