import { memo } from 'react'

export type TreeListProps = {
  editable?: boolean
}
export const TreeListRaw = ({ editable }: TreeListProps) => {
  return <div className="familyTree"></div>
}

export const TreeList = memo(TreeListRaw)
