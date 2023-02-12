import { memo, useCallback, useState } from 'react'

import { useAdminStore } from '../../stores'
export type TreeListItemProps = {
  title?: string
}
export const TreeListItemRaw = ({ title }: TreeListItemProps) => {
  const [children, setChildren] = useState<JSX.Element[]>([])
  const canEditTreeMap = useAdminStore((s) => s.canEditTreeMap)

  const handleAddChild = useCallback(() => {
    setChildren([...children, <TreeListItem key={children.length} />])
  }, [children])

  return (
    <li>
      <article>
        {title && <span>{title}</span>}
        <p>Lorem ipsum dolor</p>
        <div>
          {canEditTreeMap && (
            <button onClick={handleAddChild}>add child</button>
          )}
        </div>
      </article>
      {children.length > 0 && <ul>{children}</ul>}
    </li>
  )
}

export const TreeListItem = memo(TreeListItemRaw)
