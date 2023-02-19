import { memo, useEffect } from 'react'

import { TreeList } from '../../components'
import { program } from '../../fakeProgram'
import { useAdminStore } from '../../stores'

export const CreatePageRaw = () => {
  const setProgram = useAdminStore((s) => s.setProgram)
  useEffect(() => {
    setProgram(program)
  }, [setProgram])

  return (
    <>
      <TreeList />
    </>
  )
}
export const CreatePage = memo(CreatePageRaw)
