import { memo, useEffect } from 'react'

import { TreeList } from '../../components'
import { program } from '../../fakeProgram'
import { useAdminStore } from '../../stores'

export const CreatePageRaw = () => {
  const setProgram = useAdminStore((s) => s.setProgram)
  const setCanEditTreeMap = useAdminStore((s) => s.setCanEditTreeMap)
  const canEditTreeMap = useAdminStore((s) => s.canEditTreeMap)

  useEffect(() => {
    setProgram(program)
  }, [setProgram])

  return (
    <>
      <button onClick={() => setCanEditTreeMap(!canEditTreeMap)}>
        toggle edit
      </button>
      <TreeList />
    </>
  )
}
export const CreatePage = memo(CreatePageRaw)
