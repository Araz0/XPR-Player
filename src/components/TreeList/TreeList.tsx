import { memo, useEffect, useState } from 'react'

import styled from 'styled-components'

import { TreeItem } from 'components/TreeItem'

import { useProgram } from 'hooks'
import { SegmentType } from 'types'

import './style.css'

const StyledUl = styled.ul`
  padding-bottom: 50px;
`

export const TreeListRaw = () => {
  const { getProgramIntroSegment } = useProgram()

  const [introSegment, setIntroSegment] = useState<SegmentType | undefined>(
    undefined
  )

  useEffect(() => {
    const intro = getProgramIntroSegment()
    setIntroSegment(intro)
  }, [getProgramIntroSegment])

  if (!introSegment) return null
  return (
    <div className="familyTree">
      <StyledUl>
        <TreeItem segmentId={introSegment.id}></TreeItem>
      </StyledUl>
    </div>
  )
}

export const TreeList = memo(TreeListRaw)
