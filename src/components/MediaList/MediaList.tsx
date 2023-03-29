import { memo, useCallback, useState } from 'react'

import styled from 'styled-components'

import { MediaItem } from 'components/MediaItem'

import { SegmentMediaType } from 'types'
import { generateNewId } from 'utils'

const StyledMediaContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`

export type MediaListProps = {
  mediaArray: SegmentMediaType[]
  onMediaClick?: (mediaId: number) => void
}
export const MediaListRaw = ({ mediaArray, onMediaClick }: MediaListProps) => {
  const [selectedMedia, setSelectedMedia] = useState<
    SegmentMediaType | undefined
  >()

  const handleOnMediaClick = useCallback(
    (media: SegmentMediaType) => {
      setSelectedMedia(media)
      onMediaClick && onMediaClick(media.id)
    },
    [onMediaClick]
  )

  const handleOnRemoveClick = useCallback(
    (id: number) => {
      mediaArray.filter((media) => media.id !== id)
    },
    [mediaArray]
  )

  const handleOnCopyClick = useCallback(
    (media: SegmentMediaType) => {
      const cloneMedia = media
      cloneMedia.id = generateNewId()
      mediaArray.push(cloneMedia)
    },
    [mediaArray]
  )

  return (
    <StyledMediaContainer>
      {mediaArray.map((media, idx) => {
        return (
          <MediaItem
            media={media}
            onDelete={() => handleOnRemoveClick(media.id)}
            onCopy={() => handleOnCopyClick(media)}
            onClick={() => handleOnMediaClick(media)}
            isSelected={selectedMedia?.id === media.id}
            key={idx}
            hideActions={true}
          />
        )
      })}
    </StyledMediaContainer>
  )
}

export const MediaList = memo(MediaListRaw)
