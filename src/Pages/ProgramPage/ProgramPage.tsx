import { memo, useEffect } from 'react'

import { TreeList } from '../../components'
import { useAdminStore } from '../../stores'

export const ProgramPageRaw = () => {
  const setProgram = useAdminStore((s) => s.setProgram)
  useEffect(() => {
    // setProgram(program)
  }, [setProgram])

  return (
    <>
      <TreeList />
    </>
  )
}
export const ProgramPage = memo(ProgramPageRaw)
