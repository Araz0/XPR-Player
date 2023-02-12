import { memo, useCallback, useState } from 'react'

import { useAdminStore } from '../../stores'
export type TreeListItemProps = {
  title?: string
  body?: string
  children?: JSX.Element[]
}
export const TreeListItemRaw = ({
  title,
  body,
  children,
}: TreeListItemProps) => {
  const [childrenE, setChildrenE] = useState<JSX.Element[]>(children || [])
  const canEditTreeMap = useAdminStore((s) => s.canEditTreeMap)

  const handleAddChild = useCallback(() => {
    setChildrenE([
      ...childrenE,
      <TreeListItem key={childrenE.length} title={'some item'} />,
    ])
  }, [childrenE])

  return (
    <li>
      <article>
        {title && <span>{title}</span>}
        {body && <p>{body}</p>}
        <div>
          {canEditTreeMap && (
            <button onClick={handleAddChild}>add child</button>
          )}
        </div>
      </article>
      {childrenE.length > 0 && <ul>{childrenE}</ul>}
    </li>
  )
}

export const TreeListItem = memo(TreeListItemRaw)
