import { SegmentMediaType } from '../types'

export function getMediaById(media: SegmentMediaType[], mediatId: number) {
  return media.find((media) => media.id === mediatId)
}
