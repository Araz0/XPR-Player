import { VideoRefElement } from '../../types'

export class VideoService {
  private _videoElement: VideoRefElement
  private _id: string

  constructor(id: string, videoElement?: VideoRefElement) {
    console.log('VideoController is created')

    this._videoElement = videoElement
    this._id = id
  }

  get videoElement() {
    return this._videoElement
  }
  set videoElement(videoElement: VideoRefElement) {
    this._videoElement = videoElement
  }

  get id() {
    return this._id
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
    if (!this._videoElement?.current) return -1
    return this._videoElement.current.duration
  }
  public getCurrentTime = () => {
    if (!this._videoElement?.current) return -1
    return this._videoElement.current.currentTime
  }
  public getProgressInPercentage = () => {
    if (!this._videoElement?.current) return -1

    return (
      (this._videoElement.current.currentTime /
        this._videoElement.current.duration) *
      100
    )
  }

  public setDisplayHide = () => {
    if (!this._videoElement?.current) return
    // this._videoElement.current.style.display = 'none'
    this._videoElement.current.style.zIndex = '-1'
  }
  public setDisplayBlock = () => {
    if (!this._videoElement?.current) return
    // this._videoElement.current.style.display = 'block'
    this._videoElement.current.style.zIndex = '+1'
  }

  public resetPlayer = () => {
    if (!this._videoElement?.current) return
    this._videoElement.current.currentTime = 0
  }

  /**
   * https://html.spec.whatwg.org/multipage/media.html#mediaevents
    function addListenerMulti(el, s, fn) {
      s.split(' ').forEach(e => el.addEventListener(e, fn, false));
    }

    var video = document.getElementById('myVideo');

    addListenerMulti(video, 'abort canplay canplaythrough durationchange emptied encrypted ended error interruptbegin interruptend loadeddata loadedmetadata loadstart mozaudioavailable pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting', function(e){
        console.log(e.type);
    });
   */
}
