import { memo, useCallback, useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

import { useProgram } from '../../hooks'
import { SegmentMediaType, SegmentType } from '../../types'
import { generateNewId } from '../../utils'
import { EditableLabel } from '../EditableLabel'
import { PasteSegmentIdPopup } from '../PasteSegmentIdPopup'
import { ScreenFormPopup } from '../ScreenFormPopup'
import { SegmentScreens } from '../SegmentScreens'
import { iconTypes, SmallIconButton } from '../SmallIconButton'

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
  const [showPasteId, setShowPasteId] = useState<boolean>(false)
  const [showAddScreen, setShowAddScreen] = useState<boolean>(false)
  const [segment, setSegment] = useState<SegmentType | undefined>(undefined)
  const [media, setMedia] = useState<SegmentMediaType | undefined>(undefined)
  const {
    getSegmentById,
    updateMedia,
    removeSegment,
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

  const handleCopyId = useCallback(() => {
    navigator.clipboard.writeText(segmentId.toString())
  }, [segmentId])

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

  const handleDelete = useCallback(() => {
    removeSegment(segmentId)
  }, [removeSegment, segmentId])

  if (!segment) return null
  return (
    <li>
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
                tooltip="Delete Segment"
                onClick={handleDelete}
                icon={iconTypes.DELETE}
              />
              <SmallIconButton
                tooltip="Add Segment"
                onClick={() => addNewSegment(segment, generateNewId())}
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
                  segmentId={segment.id}
                  onClose={() => setShowPasteId(false)}
                />
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

          <SmallIconButton
            tooltip="Copy Segment Id"
            onClick={handleCopyId}
            icon={iconTypes.COPY_ALL}
          />
        </StyledActionsContainer>
      </article>
      {segment.nextSegmentIds && segment.nextSegmentIds.length > 0 && (
        <ul>
          {segment.nextSegmentIds?.map((id, idx) => {
            return <TreeItem key={idx} segmentId={id} />
          })}
        </ul>
      )}
    </li>
  )
}

export const TreeItem = memo(TreeItemRaw)
