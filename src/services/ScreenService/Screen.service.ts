import {
  VideoRefElementType,
  PlayerContainerType,
  ProgramType,
  ScreenStatus,
  SegmentType,
} from '../../types'
import { getIntroSegment, getMediaById, getSegmentById } from '../../utils'
import { VideoService } from '../VideoService'

export class ScreenService {
  private _id: number
  private _player1: VideoService
  private _player2: VideoService
  private _containerRef: PlayerContainerType
  private _selectedPID: string
  private _program: ProgramType | undefined
  private _IntroSegment: SegmentType | undefined
  private _status: ScreenStatus
  private _isShowingControls: boolean
  private _currentSegment: SegmentType | undefined
  private _nextSegment: SegmentType | undefined
  private _nextSelectedSegmentIndex: number | undefined

  constructor(
    screenId?: number,
    container?: PlayerContainerType,
    ref1?: VideoRefElementType,
    ref2?: VideoRefElementType
  ) {
    this._isShowingControls = false
    this._id = screenId ? screenId : 0
    this._containerRef = container || undefined
    this._player1 = new VideoService('A', ref1 || undefined)
    this._player2 = new VideoService('B', ref2 || undefined)
    this._selectedPID = this._player1.id
    this._status = ScreenStatus.EMPTY
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
  public destroyScreen = () => {
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

  public pause = () => {
    this.currentPlayer().pause()
  }

  public reset = () => {
    this.setEndScreen()
    this.setSrcToIntro()
  }

  public playPause = () => {
    if (this.currentPlayer().videoElement?.current?.paused) {
      this.play()
    } else {
      this.pause()
    }
  }
  public requestFullScreen = () => {
    if (!this._containerRef?.current) return
    this._containerRef?.current.requestFullscreen()
  }
  public playNext = () => {
    this.currentPlayer().pause()
    this.nextPlayer().show()
    this.nextPlayer().play()
    this.currentPlayer().hide()
    this.currentPlayer().resetPlayer()
    this.setCurrentAsNextPlayer()
    this._currentSegment = this._nextSegment
    this._nextSegment = undefined
    this._nextSelectedSegmentIndex = undefined
  }
  public setEndScreen = () => {
    this._status = ScreenStatus.STAND_BY
    this._currentSegment = undefined
    this._nextSegment = undefined
    this._nextSelectedSegmentIndex = undefined
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
    if (this._isShowingControls) {
      this.hideControls()
    } else {
      this.showControls()
    }
  }

  public setProgram = (program: ProgramType | undefined) => {
    this._program = program
    this._status = ScreenStatus.HAS_PROGRAM
    if (!program?.segments) return
    this._IntroSegment = getIntroSegment(program.segments)
  }

  public setSrcToIntro = () => {
    this._currentSegment = this._IntroSegment
    if (!this._program || !this._currentSegment?.mediaId) return
    const segmentMedia = getMediaById(
      this._program.media,
      this._currentSegment.mediaId
    )
    this.setCurrentSource(segmentMedia?.screens[this._id].mediaSrc || '')
  }

  private getNextSegment = () => {
    if (!this._currentSegment?.nextSegmentIds) return undefined // does not have next segment
    return getSegmentById(
      this._program?.segments || [],
      this._currentSegment?.nextSegmentIds[
        this._nextSelectedSegmentIndex || this.getRandomNextSegmentIndex() || 0
      ]
    )
  }
  private getRandomNextSegmentIndex = () => {
    if (!this._currentSegment?.nextSegmentIds) return undefined // does not have next segment
    const items = this._currentSegment?.nextSegmentIds
    return items[Math.floor(Math.random() * items.length)]
  }

  private onPlayerEnded = (player: VideoService) => {
    if (player.id !== this.currentPlayer().id) return
    if (this._nextSegment === undefined) {
      // if there is no more next segments to play
      this.setEndScreen()
    } else {
      this.playNext()
    }
  }

  private onPlayerUpdate = (player: VideoService) => {
    if (player.id !== this.currentPlayer().id) return

    // in the last two seconds
    if (player.getDuration() - 2 <= player.getCurrentTime()) {
      // get next segment
      this._nextSegment = this.getNextSegment()
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

    player.videoElement.current.addEventListener('ended', (e: any) => {
      this.onPlayerEnded(player)
    })

    player.videoElement.current.addEventListener('timeupdate', (e: any) => {
      this.onPlayerUpdate(player)
    })
  }

  private removeListners = (player: VideoService) => {
    if (!player.videoElement?.current) return
    player.videoElement.current.removeEventListener('ended', (e: any) => {
      this.onPlayerEnded(player)
    })
    player.videoElement.current.removeEventListener('timeupdate', (e: any) => {
      this.onPlayerUpdate(player)
    })
  }
}
