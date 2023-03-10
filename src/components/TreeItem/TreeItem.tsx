import { memo, useCallback, useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

import {
  Add,
  Check,
  Edit,
  EditOff,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material'

import { useProgram } from '../../hooks'
import { SegmentMediaType, SegmentType } from '../../types'
import { generateNewId } from '../../utils'
import { EditableLabel } from '../EditableLabel'
import { SegmentMenu } from '../SegmentMenu'
import { SegmentScreens } from '../SegmentScreens'
import { SmallIconButton } from '../SmallIconButton'

const StyledListItemContainer = styled.li`
  display: inline-table;
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: 20px 5px 0 5px;
`
const StyledVerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`
const StyledActionsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`

export type TreeItemProps = {
  segmentId: number
}
export const TreeItemRaw = ({ segmentId }: TreeItemProps) => {
  const titleRef = useRef<HTMLInputElement>()
  const descriptionRef = useRef<HTMLInputElement>()
  const [canEdit, setCanEdit] = useState<boolean>(false)
  const [showMore, setShowMore] = useState<boolean>(false)

  const [segment, setSegment] = useState<SegmentType | undefined>(undefined)
  const [media, setMedia] = useState<SegmentMediaType | undefined>(undefined)
  const {
    getSegmentById,
    updateMedia,
    getMediaById,
    setMediaIdInSegment,
    addMediaToProgram,
    addNewSegment,
  } = useProgram()

  useEffect(() => {
    const foundSegment = getSegmentById(segmentId)
    if (!foundSegment) return
    setSegment(foundSegment)
    if (!foundSegment.mediaId) return
    const foundMedia = getMediaById(foundSegment.mediaId)
    if (!foundMedia) return
    setMedia(foundMedia)
  }, [getMediaById, getSegmentById, segmentId])

  const handleToggleShowMore = useCallback(() => {
    setShowMore(!showMore)
  }, [showMore])

  const handleToggleEdit = useCallback(() => {
    setCanEdit(!canEdit)
  }, [canEdit])

  const handleSave = useCallback(() => {
    if (!segment) return
    const updatedMedia = {
      ...media,
      id: media ? media.id : generateNewId(),
      title: titleRef.current?.value || 'No title',
      description: descriptionRef.current?.value || 'No description',
      screens: media ? media.screens : [],
    }
    if (media) {
      updateMedia(updatedMedia)
    } else {
      addMediaToProgram(updatedMedia)
      setMediaIdInSegment(segment, updatedMedia.id)
    }

    handleToggleEdit()
  }, [
    addMediaToProgram,
    handleToggleEdit,
    media,
    segment,
    setMediaIdInSegment,
    updateMedia,
  ])

  // if (!segment) return null
  return (
    <StyledListItemContainer>
      <article>
        <StyledVerticalContainer>
          <EditableLabel
            inputRef={titleRef}
            canEdit={canEdit}
            text={media?.title}
            placeHolder={'media title'}
            lineHeight={1}
          />
          <EditableLabel
            inputRef={descriptionRef}
            canEdit={canEdit}
            text={media?.description}
            placeHolder={'media description'}
            typographyVariant={'body2'}
          />
          {showMore && media && <SegmentScreens media={media} />}
        </StyledVerticalContainer>

        <StyledActionsContainer>
          <SmallIconButton
            onClick={handleToggleEdit}
            icon={
              canEdit ? <EditOff fontSize="small" /> : <Edit fontSize="small" />
            }
            tooltip={canEdit ? 'Cancel' : 'Edit'}
          />
          {canEdit && (
            <>
              <SmallIconButton
                tooltip="Save"
                onClick={handleSave}
                icon={<Check fontSize="small" />}
              />
            </>
          )}
          <SmallIconButton
            tooltip="Add Segment"
            onClick={() =>
              segment
                ? addNewSegment(segment, generateNewId())
                : alert('No segment found')
            }
            icon={<Add fontSize="small" />}
          />
          {media && (
            <SmallIconButton
              tooltip={showMore ? 'Hide More' : 'Show More'}
              onClick={handleToggleShowMore}
              icon={
                showMore ? (
                  <ExpandLess fontSize="small" />
                ) : (
                  <ExpandMore fontSize="small" />
                )
              }
            />
          )}
          <SegmentMenu segmentId={segmentId} media={media} />
        </StyledActionsContainer>
      </article>
      {segment?.nextSegmentIds && segment?.nextSegmentIds.length > 0 && (
        <ul>
          {segment.nextSegmentIds?.map((id, idx) => {
            return <TreeItem key={idx} segmentId={id} />
          })}
        </ul>
      )}
    </StyledListItemContainer>
  )
}

export const TreeItem = memo(TreeItemRaw)
