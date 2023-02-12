import { memo } from 'react'

import { TreeList } from '../../components'
import { useAdminStore } from '../../stores'

export const CreatePageRaw = () => {
  const setCanEditTreeMap = useAdminStore((s) => s.setCanEditTreeMap)
  const canEditTreeMap = useAdminStore((s) => s.canEditTreeMap)

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
