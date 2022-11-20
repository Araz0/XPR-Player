export class ScreenPlayer {
  private _videoElement: React.MutableRefObject<any> | null

  constructor() {
    this._videoElement = null
  }

  get videoElement() {
    return this._videoElement
  }

  set videoElement(videoElement: React.MutableRefObject<any> | null) {
    this._videoElement = videoElement
  }

  public play = () => {
    this._videoElement?.current.play()
  }

  public pause = () => {
    this._videoElement?.current.pause()
  }
  public setSource = (src: string) => {
    if (!this.videoElement) return
    this.videoElement.current.src = src
  }
}
