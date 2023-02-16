import { SegmentType } from '../types'

export function getIntroSegment(segments: SegmentType[]) {
  return segments.find((seg) => seg.isIntro)
}
