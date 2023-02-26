import {
  VideoRefElementType,
  PlayerContainerType,
  ProgramType,
  ScreenStatus,
} from '../../types'
import { VideoService } from '../VideoService'

export class ScreenService {
  private _id: string | undefined
  private _player1: VideoService
  private _player2: VideoService
  private _containerRef: PlayerContainerType
  private _selectedPID: string
  private _program: ProgramType | undefined
  private _status: ScreenStatus
  private _isShowingControls: boolean

  constructor(
    screenId?: string | undefined,
    container?: PlayerContainerType,
    ref1?: VideoRefElementType,
    ref2?: VideoRefElementType
  ) {
    this._isShowingControls = false
    this._id = screenId
    this._containerRef = container || undefined
    this._player1 = new VideoService('A', ref1 || undefined)
    this._player2 = new VideoService('B', ref2 || undefined)
    this._selectedPID = this._player1.id
    this._status = ScreenStatus.EMPTY
  }
  public setRefs = (
    screenId: string | undefined,
    container: PlayerContainerType,
    ref1: VideoRefElementType,
    ref2: VideoRefElementType
  ) => {
    this._id = screenId
    this._containerRef = container
    this._player1.videoElement = ref1
    this._player2.videoElement = ref2
    this.nextPlayer().hide()
    this.setListners(this._player1)
    this.setListners(this._player2)
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
  }

  private onPlayerEnded = (player: VideoService) => {
    if (player.id !== this.currentPlayer().id) return
    console.log('🛑 ended - ', player.id)

    this.playNext()
  }

  private onPlayerUpdate = (player: VideoService) => {
    if (player.id !== this.currentPlayer().id) return

    if (player.getDuration() - 2 <= player.getCurrentTime()) {
      // in the last two seconds
      // todo:
      // maybe set external service to handle reading the program and feed it to here:
      // set next source to next player

      console.log('📈 timeupdate - player Id:', player.id)
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
