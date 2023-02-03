import { VideoRefElementType, PlayerContainerType } from '../../types'
import { VideoService } from '../VideoService'

export class ScreenService {
  private _player1: VideoService
  private _player2: VideoService
  private _containerRef: PlayerContainerType
  // private _selectedPlayer: VideoService
  private _selectedPID: string

  constructor(
    container?: PlayerContainerType,
    ref1?: VideoRefElementType,
    ref2?: VideoRefElementType
  ) {
    this._containerRef = container || undefined
    this._player1 = new VideoService('A', ref1 || undefined)
    this._player2 = new VideoService('B', ref2 || undefined)
    this._selectedPID = this._player1.id
  }
  public setRefs = (
    container: PlayerContainerType,
    ref1: VideoRefElementType,
    ref2: VideoRefElementType
  ) => {
    this._containerRef = container
    this._player1.videoElement = ref1
    this._player2.videoElement = ref2
    this.nextPlayer().setDisplayHide()
    this.setListners(this._player1)
    this.setListners(this._player2)
  }
  public destroyScreen = () => {
    this.removeListners(this._player1)
    this.removeListners(this._player2)
  }
  private currentPlayer = () => {
    // todo: set return type as :VideoService
    return this._selectedPID === this._player1.id
      ? this._player1
      : this._player2
  }
  private nextPlayer = () => {
    // todo: set return type as :VideoService
    return this._selectedPID === this._player1.id
      ? this._player2
      : this._player1
  }

  public setCurrentAsNextPlayer = () => {
    this._selectedPID = this.nextPlayer().id
  }
  private play = () => {
    this.currentPlayer().play()
  }

  private pause = () => {
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
    // pause current player
    this.currentPlayer().pause()
    // show next player
    this.nextPlayer().setDisplayBlock()
    // hide & reset current player
    this.currentPlayer().setDisplayHide()
    this.currentPlayer().resetPlayer()
    // play next player
    this.nextPlayer().play()
  }
  public setCurrentSource = (src: string) => {
    this.currentPlayer().setSource(src)
  }
  public setNextSource = (src: string) => {
    this.nextPlayer().setSource(src)
  }
  private onPlayerEnded = (player: VideoService) => {
    if (player.id !== this.currentPlayer().id) return
    console.log('🛑 ended - ', player.id)

    this.playNext()

    // toggle current and next players
    this.setCurrentAsNextPlayer()
  }
  private onPlayerUpdate = (player: VideoService) => {
    if (player.id !== this.currentPlayer().id) return

    if (player.getDuration() - 2 <= player.getCurrentTime()) {
      //last two seconds
      // todo:
      // set next source to next player

      console.log('📈 timeupdate - ', player.id)
    }
  }

  private setListners = (player: VideoService) => {
    if (!player.videoElement?.current) return
    console.log('🪄 setListners')

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
