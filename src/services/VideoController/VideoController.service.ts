import { VideoRefElement } from '../../types'

export class VideoController {
  private _videoElement: VideoRefElement
  private _id: string

  constructor(id: string, videoElement?: VideoRefElement) {
    // eslint-disable-next-line no-console
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
  private setListners = () => {
    if (!this._videoElement?.current) return
    this._videoElement?.current.addEventListener('ended', (e) => {
      // eslint-disable-next-line no-console
      console.log('ended', e)
      this.setSource('https://media.w3.org/2010/05/sintel/trailer.mp4')
      this.play()
    })
    this._videoElement?.current.addEventListener('timeupdate', (e) => {
      if (!this._videoElement?.current) return
      if (
        this._videoElement.current.duration - 2 <=
        this._videoElement.current.currentTime
      ) {
        //last two seconds

        // eslint-disable-next-line no-console
        console.log('timeupdate', e)
      }
    })
  }
  private removeListners = () => {
    if (!this._videoElement?.current) return
    this._videoElement?.current.removeEventListener('ended', (e) => {
      // eslint-disable-next-line no-console
      console.log('ended', e)
    })
    this._videoElement?.current.removeEventListener('timeupdate', (e) => {
      if (!this._videoElement?.current) return
      if (
        this._videoElement.current.duration - 2 <=
        this._videoElement.current.currentTime
      ) {
        //last two seconds

        // eslint-disable-next-line no-console
        console.log('timeupdate', e)
      }
    })
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
