import { VideoRefElement } from '../../types'

export class VideoController {
  private _videoElement: VideoRefElement

  constructor() {
    // eslint-disable-next-line no-console
    console.log('VideoController is created')
  }

  get videoElement() {
    return this._videoElement
  }

  set videoElement(videoElement: VideoRefElement) {
    this._videoElement = videoElement
  }

  public play = () => {
    if (!this._videoElement?.current) return
    this._videoElement?.current.play()
  }

  public pause = () => {
    if (!this._videoElement?.current) return
    this._videoElement?.current.pause()
  }
  public setSource = (src: string) => {
    if (!this._videoElement?.current) return
    this._videoElement.current.src = src
  }
  public toggleMute = () => {
    if (!this._videoElement?.current) return
    this._videoElement.current.muted = !this._videoElement.current.muted
  }
  public getDuration = () => {
    if (!this._videoElement?.current) return
    // eslint-disable-next-line no-console
    console.log(
      this._videoElement.current.duration,
      this._videoElement.current.currentTime,
      (this._videoElement.current.currentTime /
        this._videoElement.current.duration) *
        100
    )
    return this._videoElement.current.duration
  }
}
