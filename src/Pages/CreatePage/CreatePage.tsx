import { memo, useState } from 'react'

import { TreeList } from '../../components'

export const CreatePageRaw = () => {
  const [treeIsEditable, setTreeIsEditable] = useState<boolean>(true)
  return (
    <>
      <button onClick={() => setTreeIsEditable(!treeIsEditable)}>
        toggle edit
      </button>
      <TreeList editable={treeIsEditable} />
    </>
  )
}
export const CreatePage = memo(CreatePageRaw)
