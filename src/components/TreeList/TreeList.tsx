import { memo } from 'react'

import styled from 'styled-components'

import { program } from '../../fakeProgram'
import { getIntroSegment } from '../../utils'
import { TreeItem } from '../TreeItem'

import './style.css'

const StyledUl = styled.ul`
  padding-bottom: 50px;
`

export const TreeListRaw = () => {
  const intro = getIntroSegment(program.segments)
  if (!intro) return null
  return (
    <>
      <div className="familyTree">
        <StyledUl>
          <TreeItem title={intro.title}>
            {program.segments.map((seg, idx) => {
              return <TreeItem key={idx} title={seg.title} />
            })}
          </TreeItem>
        </StyledUl>
      </div>
    </>
  )
}

export const TreeList = memo(TreeListRaw)
