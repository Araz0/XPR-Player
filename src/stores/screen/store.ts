import { create } from 'zustand'

import { ProgramType, StandByMods } from '../../types'

export type ScreenState = {
  program: ProgramType | undefined
  setProgram: (program: ProgramType | undefined) => void

  standByMode: StandByMods
  setStandByMode: (standByMode: StandByMods) => void

  programStarted: boolean
  setProgramStarted: (programStarted: boolean) => void
}

export const useScreenStore = create<ScreenState>((set) => ({
  program: undefined,
  setProgram: (program: ProgramType | undefined) => set(() => ({ program })),

  standByMode: StandByMods.TEXT,
  setStandByMode: (standByMode: StandByMods) => set(() => ({ standByMode })),

  programStarted: false,
  setProgramStarted: (programStarted: boolean) =>
    set(() => ({ programStarted })),
}))
