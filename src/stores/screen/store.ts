import { create } from 'zustand'

import { ProgramType } from '../../types'

export type ScreenState = {
  program: ProgramType | undefined
  setProgram: (program: ProgramType | undefined) => void
}

export const useScreenStore = create<ScreenState>((set) => ({
  program: undefined,
  setProgram: (program: ProgramType | undefined) => set(() => ({ program })),
}))
