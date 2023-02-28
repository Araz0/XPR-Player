import { memo } from 'react'

import {
  AdminPageWrapper,
  LoadingAnimation,
  LoadLocalProgramButton,
  ProgramsList,
} from '../../components'
import { useAdminStore } from '../../stores'

export const ProgramsPageRaw = () => {
  const loadedPrograms = useAdminStore((s) => s.loadedPrograms)

  return (
    <AdminPageWrapper
      topNavHeader="programs"
      topNavActions={<LoadLocalProgramButton />}
    >
      {!loadedPrograms ? (
        <LoadingAnimation />
      ) : loadedPrograms.length < 1 ? (
        <h3>
          You dont have any programs saved online, import a local json save or
          create a new one.
        </h3>
      ) : (
        <ProgramsList
          programs={loadedPrograms}
          navigateToPath="/admin/programs"
        />
      )}
    </AdminPageWrapper>
  )
}
export const ProgramsPage = memo(ProgramsPageRaw)
