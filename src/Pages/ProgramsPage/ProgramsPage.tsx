import { memo } from 'react'

import { useCheckUserAuth } from 'hooks/useCheckUserAuth'

import {
  AdminPageWrapper,
  LoadingAnimation,
  LoadLocalProgramButton,
  ProgramsList,
} from 'components'
import { useAdminStore } from 'stores'

export const ProgramsPageRaw = () => {
  const loadedPrograms = useAdminStore((s) => s.loadedPrograms)
  useCheckUserAuth()

  return (
    <AdminPageWrapper
      topNavHeader="Programs"
      topNavActions={<LoadLocalProgramButton />}
    >
      {!loadedPrograms ? (
        <LoadingAnimation />
      ) : (
        <ProgramsList programs={loadedPrograms} />
      )}
    </AdminPageWrapper>
  )
}
export const ProgramsPage = memo(ProgramsPageRaw)
