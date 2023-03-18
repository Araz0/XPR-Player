import { SegmentType } from 'types'

export function getSegmentById(segments: SegmentType[], segmentId: number) {
  return segments.find((seg) => seg.id === segmentId)
}
