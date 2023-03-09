import { memo, useCallback, useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

import { Check } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { useProgram } from '../../hooks'
import { SegmentMediaType, SegmentType } from '../../types'
import { generateNewId } from '../../utils'
import { EditableLabel } from '../EditableLabel'
import { PasteSegmentIdPopup } from '../PasteSegmentIdPopup'
import { Popup } from '../Popup'
import { ScreenFormPopup } from '../ScreenFormPopup'
import { SegmentScreens } from '../SegmentScreens'
import { iconTypes, SmallIconButton } from '../SmallIconButton'

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
const StyledHeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledLeftHeaderActions = styled.div``
const StyledRightHeaderActions = styled.div``

export type TreeItemProps = {
  segmentId: number
}
export const TreeItemRaw = ({ segmentId }: TreeItemProps) => {
  const titleRef = useRef<HTMLInputElement>()
  const descriptionRef = useRef<HTMLInputElement>()
  const [canEdit, setCanEdit] = useState<boolean>(false)
  const [showMore, setShowMore] = useState<boolean>(false)
  const [showPasteId, setShowPasteId] = useState<boolean>(false)
  const [showAddScreen, setShowAddScreen] = useState<boolean>(false)
  const [showDeleteSegment, setShowDeleteSegment] = useState<boolean>(false)
  const [segment, setSegment] = useState<SegmentType | undefined>(undefined)
  const [media, setMedia] = useState<SegmentMediaType | undefined>(undefined)
  const {
    getSegmentById,
    updateMedia,
    getMediaById,
    setMediaIdInSegment,
    addMediaToProgram,
    addNewSegment,
    removeSegment,
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

  const handleCopyId = useCallback(() => {
    navigator.clipboard.writeText(segmentId.toString())
  }, [segmentId])

  const handleDeleteSegment = useCallback(() => {
    removeSegment(segmentId)
    setShowDeleteSegment(false)
  }, [removeSegment, segmentId])

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
        <StyledHeaderActions>
          <StyledLeftHeaderActions>
            <SmallIconButton
              tooltip="Copy Segment Id"
              onClick={handleCopyId}
              icon={iconTypes.COPY_ALL}
            />
          </StyledLeftHeaderActions>
          <StyledRightHeaderActions>
            {canEdit && (
              <SmallIconButton
                tooltip="Delete Segment"
                onClick={() => setShowDeleteSegment(true)}
                icon={iconTypes.DELETE}
              />
            )}
          </StyledRightHeaderActions>
        </StyledHeaderActions>
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
          {showMore && media && (
            <SegmentScreens media={media} canEdit={canEdit} />
          )}
        </StyledVerticalContainer>

        <StyledActionsContainer>
          <SmallIconButton
            onClick={handleToggleEdit}
            icon={canEdit ? iconTypes.EDIT_OFF : iconTypes.EDIT}
            tooltip={canEdit ? 'Cancel' : 'Edit'}
          />
          {canEdit && (
            <>
              <SmallIconButton
                tooltip="Save"
                onClick={handleSave}
                icon={iconTypes.CHECK}
              />

              <SmallIconButton
                tooltip="Add Segment"
                onClick={() =>
                  segment
                    ? addNewSegment(segment, generateNewId())
                    : alert('No segment found')
                }
                icon={iconTypes.ADD}
              />
              <SmallIconButton
                tooltip="Paste Segment ID"
                onClick={() => setShowPasteId(true)}
                icon={iconTypes.CONTENT_PASTE}
              />
              {media && (
                <SmallIconButton
                  tooltip="Add Screen"
                  onClick={() => setShowAddScreen(true)}
                  icon={iconTypes.QUEUE_PLAY_NEXT}
                />
              )}
              {media && showAddScreen && (
                <ScreenFormPopup
                  mediatId={media.id}
                  onClose={() => setShowAddScreen(false)}
                />
              )}
              {showPasteId && (
                <PasteSegmentIdPopup
                  segmentId={segment ? segment.id : undefined}
                  onClose={() => setShowPasteId(false)}
                />
              )}

              {showDeleteSegment && (
                <Popup
                  onClose={() => setShowDeleteSegment(false)}
                  header="Delete Segment"
                  bodyText="Are you sure you want to delete this segment?"
                >
                  <IconButton onClick={handleDeleteSegment}>
                    <Check />
                  </IconButton>
                </Popup>
              )}
            </>
          )}
          {media && (
            <SmallIconButton
              tooltip={showMore ? 'Hide More' : 'Show More'}
              onClick={handleToggleShowMore}
              icon={showMore ? iconTypes.EXPAND_LESS : iconTypes.EXPAND_MORE}
            />
          )}
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
