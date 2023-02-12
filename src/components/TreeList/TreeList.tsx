import { memo } from 'react'

import styled from 'styled-components'

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
          <TreeListItem title={'Program Start'} />
        </StyledUl>
      </div>
      <div id="graphy"></div>
    </>
  )
}

export const TreeList = memo(TreeListRaw)
