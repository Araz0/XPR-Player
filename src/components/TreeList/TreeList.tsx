import { memo } from 'react'

import styled from 'styled-components'

import { program } from '../../fakeProgram'
import { TreeListItem } from '../TreeListItem'
import './style.css'

const StyledUl = styled.ul`
  padding-bottom: 50px;
`

export const TreeListRaw = () => {
  return (
    <>
      <div className="familyTree">
        <StyledUl>
          <TreeListItem title={'Intro'}>
            {program.segments.map((seg) => {
              return <TreeListItem title={seg.title} />
            })}
          </TreeListItem>
        </StyledUl>
      </div>
    </>
  )
}

export const TreeList = memo(TreeListRaw)
