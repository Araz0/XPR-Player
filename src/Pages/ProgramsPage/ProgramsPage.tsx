import { memo } from 'react'

import {
  AdminPageWrapper,
  LoadingAnimation,
  LoadLocalProgramButton,
  ProgramsList,
} from 'components'
import { useAdminStore } from 'stores'

export const ProgramsPageRaw = () => {
  const loadedPrograms = useAdminStore((s) => s.loadedPrograms)

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
