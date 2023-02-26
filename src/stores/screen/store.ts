import { create } from 'zustand'

import { ProgramType, StandByMods } from '../../types'

export type ScreenState = {
  program: ProgramType | undefined
  setProgram: (program: ProgramType | undefined) => void

  standByMode: StandByMods
  setStandByMode: (standByMode: StandByMods) => void

  programStarted: boolean
  setProgramStarted: (programStarted: boolean) => void

  showControls: boolean
  setShowControls: (showControls: boolean) => void
}

export const useScreenStore = create<ScreenState>((set) => ({
  program: undefined,
  setProgram: (program: ProgramType | undefined) => set(() => ({ program })),

  standByMode: StandByMods.TEXT,
  setStandByMode: (standByMode: StandByMods) => set(() => ({ standByMode })),

  programStarted: false,
  setProgramStarted: (programStarted: boolean) =>
    set(() => ({ programStarted })),

  showControls: false,
  setShowControls: (showControls: boolean) => set(() => ({ showControls })),
}))
