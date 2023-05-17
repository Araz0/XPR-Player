import { VideoService } from 'services/VideoService'

import {
  VideoRefElementType,
  PlayerContainerType,
  ProgramType,
  SegmentType,
} from 'types'
import { getIntroSegment, getMediaById, getSegmentById } from 'utils'

export class ScreenService {
  private _id = 0
  private _player1: VideoService
  private _player2: VideoService
  private _containerRef: PlayerContainerType | undefined
  private _selectedPID: string
  private _program: ProgramType | undefined
  private _IntroSegment: SegmentType | undefined
  private _isShowingControls = false
  private _currentSegment: SegmentType | undefined
  private _nextSegment: SegmentType | undefined
  private _nextSelectedSegmentIndex = 0

  constructor() {
    this._player1 = new VideoService('A', undefined)
    this._player2 = new VideoService('B', undefined)
    this._selectedPID = this._player1.id
  }

  public setRefs = (
    screenId: number,
    container: PlayerContainerType,
    ref1: VideoRefElementType,
    ref2: VideoRefElementType
  ) => {
    this._id = screenId
    this._containerRef = container
    this._player1.videoElement = ref1
    this._player2.videoElement = ref2
    this.nextPlayer().hide()
  }

  public setAllListners = () => {
    this.setListners(this._player1)
    this.setListners(this._player2)
  }

  public setNextSelectedSegmentIndex = (index: number) => {
    this._nextSelectedSegmentIndex = index
  }

  public removeAllListners = () => {
    this.removeListners(this._player1)
    this.removeListners(this._player2)
  }

  public currentPlayer() {
    return this._selectedPID === this._player1.id
      ? this._player1
      : this._player2
  }

  public nextPlayer() {
    return this._selectedPID === this._player1.id
      ? this._player2
      : this._player1
  }

  public setCurrentAsNextPlayer = () => {
    this._selectedPID = this.nextPlayer().id
  }

  public play = () => {
    this.currentPlayer().play()
  }
  public playWithTimestamp = (timestamp: number, exicute: () => void) => {
    this.currentPlayer().playWithTimestamp(timestamp)
    exicute()
  }

  public pause = () => {
    this.currentPlayer().pause()
  }

  public reset = () => {
    this.removeAllListners()
    this.setAllListners()

    this.setEndScreen()
    this.currentPlayer().show()
    this.setSrcToIntro()
  }

  public playPause = () => {
    this.currentPlayer().videoElement?.current?.paused
      ? this.play()
      : this.pause()
  }

  public requestFullScreen = () => {
    if (this._containerRef?.current)
      this._containerRef.current.requestFullscreen()
  }

  public playNext = () => {
    this.nextPlayer().play()
    this.nextPlayer().show()
    this.currentPlayer().hide()
    this.currentPlayer().pause()
    this.currentPlayer().resetPlayer()
    this.setCurrentAsNextPlayer()
    this._currentSegment = this._nextSegment
    this._nextSegment = undefined
    this._nextSelectedSegmentIndex = 0
  }

  public setEndScreen = () => {
    this._currentSegment = undefined
    this._nextSegment = undefined
    this._nextSelectedSegmentIndex = 0
    this._selectedPID = this._player1.id
    this.currentPlayer().pause()
    this.nextPlayer().pause()
    this.currentPlayer().resetPlayer()
    this.nextPlayer().resetPlayer()
    this.currentPlayer().hide()
    this.nextPlayer().hide()
    this.currentPlayer().setSource('')
    this.nextPlayer().setSource('')
  }

  public setCurrentSource = (src: string) => {
    this.currentPlayer().setSource(src)
  }

  public setNextSource = (src: string) => {
    this.nextPlayer().setSource(src)
  }

  public showControls = () => {
    this.currentPlayer().showControls()
    this.nextPlayer().showControls()
    this._isShowingControls = true
  }

  public hideControls = () => {
    this.currentPlayer().hideControls()
    this.nextPlayer().hideControls()
    this._isShowingControls = false
  }

  public toggleControls = () => {
    this._isShowingControls ? this.hideControls() : this.showControls()
  }

  public setProgram = (program: ProgramType | undefined) => {
    this._program = program
    if (program?.segments)
      this._IntroSegment = getIntroSegment(program.segments)
  }

  public setSrcToIntro = () => {
    this._currentSegment = this._IntroSegment
    if (!this._program || !this._currentSegment?.mediaId) return // no program or no media id
    const segmentMedia = getMediaById(
      this._program.media,
      this._currentSegment.mediaId
    )
    if (segmentMedia?.screens[this._id]) {
      this.setCurrentSource(segmentMedia?.screens[this._id].mediaSrc)
    }
  }

  private getNextSegment = () => {
    if (!this._currentSegment?.nextSegmentIds) return undefined // does not have next segment

    return getSegmentById(
      this._program?.segments || [],
      this._currentSegment?.nextSegmentIds[this._nextSelectedSegmentIndex]
    )
  }

  // private onPlayerEnded = (player: VideoService) => {
  //   if (player.id !== this.currentPlayer().id) return
  //   // if there is no more next segments to play, end screen, otherwise, play next
  //   this._nextSegment === undefined ? this.setEndScreen() : this.playNext()
  // }

  private onPlayerUpdate = (player: VideoService) => {
    if (player.id !== this.currentPlayer().id) return

    // if the video is about to end (10ms before it ends), switch to the next one.
    // switching player to the next video like this and not using "onEnded" event listner helps making the switch seamless
    if (player.getDuration() - 0.01 <= player.getCurrentTime()) {
      this._nextSegment === undefined ? this.setEndScreen() : this.playNext()
    }

    // in the last two seconds
    if (player.getDuration() - 2 <= player.getCurrentTime()) {
      // get next segment
      if (!this._nextSegment) this._nextSegment = this.getNextSegment()
      if (this._nextSegment) {
        // set next source to next player
        if (!this._program?.media || !this._nextSegment?.mediaId) return
        const media = getMediaById(
          this._program?.media,
          this._nextSegment?.mediaId
        )
        this.setNextSource(media ? media.screens[this._id].mediaSrc : '')
      }
    }
  }

  private setListners = (player: VideoService) => {
    if (!player.videoElement?.current) return

    // player.videoElement.current.addEventListener('ended', (e: any) => {
    //   this.onPlayerEnded(player)
    // })

    player.videoElement.current.addEventListener('timeupdate', (e: any) => {
      this.onPlayerUpdate(player)
    })
  }

  private removeListners = (player: VideoService) => {
    if (!player.videoElement?.current) return
    // player.videoElement.current.removeEventListener('ended', (e: any) => {
    //   this.onPlayerEnded(player)
    // })
    player.videoElement.current.removeEventListener('timeupdate', (e: any) => {
      this.onPlayerUpdate(player)
    })
  }
}
