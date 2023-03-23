import { memo, useCallback, useRef } from 'react'

import styled from 'styled-components'

import {
  DeleteOutline,
  DownloadOutlined,
  EditOutlined,
  FileCopyOutlined,
} from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { BorderdContainer } from 'components/BorderdContainer'
import { Chip } from 'components/Chip'
import { WHITE_COLOR } from 'constants/styles'

const StyledChildrenContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 2fr 1fr;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  color: ${WHITE_COLOR};
`
const StyledTagsContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
`
const StyledActionsContainer = styled.div`
  display: flex;
  justify-self: end;
  z-index: 10;
`
const StyledTitle = styled.span`
  color: ${WHITE_COLOR};
  font-size: 1.1rem;
`
const StyledThumbnail = styled.img`
  width: 120px;
  height: 60px;
  border-radius: 4px;
  object-fit: cover;
`

export type ProgramsItemProps = {
  title: string
  description: string
  tags: string[]
  thumbnail: string
  onEdit: () => void
  onCopy: () => void
  onDownload: () => void
  onDelete: () => void
  onClick: () => void
}

export const ProgramsItemRaw = ({
  title,
  description,
  tags,
  thumbnail,
  onEdit,
  onCopy,
  onDownload,
  onDelete,
  onClick,
}: ProgramsItemProps) => {
  const btnsRef = useRef<HTMLDivElement>(null)

  const handleOnClick = useCallback((e: any) => {
    e.stopPropagation()
  }, [])

  return (
    <BorderdContainer hotRef={btnsRef}>
      <StyledChildrenContainer onClick={onClick}>
        <StyledThumbnail src={thumbnail} alt={`${title} thumbnail`} />
        <StyledTitle>{title}</StyledTitle>
        <p>{description}</p>
        <StyledTagsContainer>
          {tags.map((tag) => {
            return <Chip label={tag} />
          })}
        </StyledTagsContainer>
        <StyledActionsContainer ref={btnsRef} onClick={handleOnClick}>
          <IconButton onClick={onEdit} style={{ color: WHITE_COLOR }}>
            <EditOutlined />
          </IconButton>
          <IconButton onClick={onCopy} style={{ color: WHITE_COLOR }}>
            <FileCopyOutlined />
          </IconButton>
          <IconButton onClick={onDownload} style={{ color: WHITE_COLOR }}>
            <DownloadOutlined />
          </IconButton>
          <IconButton onClick={onDelete} style={{ color: WHITE_COLOR }}>
            <DeleteOutline />
          </IconButton>
        </StyledActionsContainer>
      </StyledChildrenContainer>
    </BorderdContainer>
  )
}

export const ProgramsItem = memo(ProgramsItemRaw)
