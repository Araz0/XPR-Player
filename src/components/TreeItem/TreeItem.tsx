import { memo, useCallback, useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

import {
  Add,
  Check,
  Edit,
  EditOff,
  ExpandLess,
  ExpandMore,
  SmartDisplayOutlined,
} from '@mui/icons-material'
import { EditableLabel } from 'components/EditableLabel'
import { LabelSpan } from 'components/LabelSpan'
import { MainButton, MainButtonVariants } from 'components/MainButton'
import { MediaList } from 'components/MediaList'
import { Popup } from 'components/Popup'
import { SegmentMenu } from 'components/SegmentMenu'
import { SegmentScreens } from 'components/SegmentScreens'
import { SmallIconButton } from 'components/SmallIconButton'
import { PRIMARY_COLOR, WHITE_COLOR } from 'constants/styles'

import { useProgram } from 'hooks'
import { useAdminStore } from 'stores'
import { SegmentMediaType, SegmentType } from 'types'
import { generateNewId, getRandomColor } from 'utils'

const StyledListItemContainer = styled.li<{
  isRefed: boolean
  uniqueColor: number
}>`
  display: inline-table;
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: 20px 5px 0 5px;

  article {
    --uniqueColor: ${(props) => getRandomColor(props.uniqueColor)};

    font-family: arial, verdana, tahoma;
    font-size: 11px;
    display: inline-block;

    border-radius: 5px;
    padding: 5px 10px;
    color: ${WHITE_COLOR};

    border: 1px
      ${(props) =>
        props.isRefed
          ? 'dashed var(--uniqueColor)'
          : `solid ${PRIMARY_COLOR}`}!important;
  }
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

const StyledMediaActionsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 25px;
`
const StyledMediaListHeader = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 15px;
`
export type TreeItemProps = {
  segmentId: number
}
export const TreeItemRaw = ({ segmentId }: TreeItemProps) => {
  const titleRef = useRef<HTMLInputElement>()
  const descriptionRef = useRef<HTMLInputElement>()

  const program = useAdminStore((s) => s.program)

  const [canEdit, setCanEdit] = useState<boolean>(false)
  const [showMore, setShowMore] = useState<boolean>(false)
  const [isReferenced, setIsReferenced] = useState<boolean>(false)
  const [showMediaList, setShowMediaList] = useState<boolean>(false)
  const [selectedMediaId, setSelectedMediaId] = useState<number | undefined>()
  const [segment, setSegment] = useState<SegmentType | undefined>(undefined)
  const [media, setMedia] = useState<SegmentMediaType | undefined>(undefined)

  const {
    getSegmentById,
    updateMedia,
    getMediaById,
    setMediaIdInSegment,
    addMediaToProgram,
    addNewSegment,
    segmentIsReferenced,
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

  useEffect(() => {
    if (!segment) return
    const segmentIsReferencedMuiltipletimes = segmentIsReferenced(segment.id)
    setIsReferenced(segmentIsReferencedMuiltipletimes)
  }, [segment, segmentIsReferenced])

  const handleToggleShowMore = useCallback(() => {
    setShowMore(!showMore)
  }, [showMore])

  const handleToggleEdit = useCallback(() => {
    setCanEdit(!canEdit)
  }, [canEdit])

  const onMediaClick = useCallback((id: number) => {
    setSelectedMediaId(id)
  }, [])
  const onAddMediaClick = useCallback(
    (id: number | undefined) => {
      if (!segment) return
      if (!id) return
      segment.mediaId = id
      const foundMedia = getMediaById(id)
      if (!foundMedia) return
      setMedia(foundMedia)
      setShowMediaList(false)
    },
    [getMediaById, segment]
  )

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

  return (
    <StyledListItemContainer
      isRefed={isReferenced}
      uniqueColor={segment?.id || -1}
    >
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

          <SmallIconButton
            tooltip="select Media"
            onClick={() => setShowMediaList(true)}
            icon={<SmartDisplayOutlined fontSize="small" />}
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
      {showMediaList && (
        <Popup onClose={() => setShowMediaList(false)} header="Media Assets">
          <StyledMediaListHeader>
            <LabelSpan>
              {program
                ? program.media.length === 1
                  ? `1 Asset`
                  : `${program.media.length} Assets`
                : '0 Assets'}
            </LabelSpan>
          </StyledMediaListHeader>
          <MediaList
            mediaArray={program ? program.media : []}
            onMediaClick={onMediaClick}
          />
          <StyledMediaActionsContainer>
            <MainButton
              variant={MainButtonVariants.PRIMARY}
              onClick={() => onAddMediaClick(selectedMediaId)}
            >
              Add Media to Segment
            </MainButton>
          </StyledMediaActionsContainer>
        </Popup>
      )}
    </StyledListItemContainer>
  )
}

export const TreeItem = memo(TreeItemRaw)
