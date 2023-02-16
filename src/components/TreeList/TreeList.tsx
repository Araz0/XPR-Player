import { memo, useEffect, useState } from 'react'

import styled from 'styled-components'

import { useAdminStore } from '../../stores'
import { SegmentType } from '../../types'
import { getIntroSegment } from '../../utils'
import { TreeItem } from '../TreeItem'

import './style.css'

const StyledUl = styled.ul`
  padding-bottom: 50px;
`

export const TreeListRaw = () => {
  const program = useAdminStore((s) => s.program)
  console.log('🚀 ~ file: TreeList.tsx:18 ~ TreeListRaw ~ program', program)
  const [introSegment, setIntroSegment] = useState<SegmentType | undefined>(
    undefined
  )

  useEffect(() => {
    if (!program) return
    const intro = getIntroSegment(program.segments)
    if (!intro) return
    setIntroSegment(intro)
  }, [program])

  if (!introSegment) return null
  return (
    <>
      <div className="familyTree">
        <StyledUl>
          <TreeItem segmentId={introSegment.id}></TreeItem>
        </StyledUl>
      </div>
    </>
  )
}

export const TreeList = memo(TreeListRaw)
