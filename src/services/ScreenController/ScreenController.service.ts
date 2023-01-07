import { VideoRefElement } from '../../types'
import { VideoController } from '../VideoController'

export class ScreenController {
  private _player1: VideoController
  private _player2: VideoController
  // private _selectedPlayer: VideoController
  private _selectedPID: string

  constructor(ref1?: VideoRefElement, ref2?: VideoRefElement) {
    this._player1 = new VideoController('A', ref1 || undefined)
    this._player2 = new VideoController('B', ref2 || undefined)
    this._selectedPID = this._player1.id
  }
  public setRefs = (ref1: VideoRefElement, ref2: VideoRefElement) => {
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
    // todo: set return type as :VideoController
    return this._selectedPID === this._player1.id
      ? this._player1
      : this._player2
  }
  private nextPlayer = () => {
    // todo: set return type as :VideoController
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
  private onPlayerEnded = (player: VideoController) => {
    if (player.id !== this.currentPlayer().id) return
    console.log('🛑 ended - ', player.id)

    this.playNext()

    // toggle current and next players
    this.setCurrentAsNextPlayer()
  }
  private onPlayerUpdate = (player: VideoController) => {
    if (player.id !== this.currentPlayer().id) return

    if (player.getDuration() - 2 <= player.getCurrentTime()) {
      //last two seconds
      // todo:
      // set next source to next player

      console.log('📈 timeupdate - ', player.id)
    }
  }

  private setListners = (player: VideoController) => {
    if (!player.videoElement?.current) return
    console.log('🪄 setListners')

    player.videoElement.current.addEventListener('ended', (e) => {
      this.onPlayerEnded(player)
    })

    player.videoElement.current.addEventListener('timeupdate', (e) => {
      this.onPlayerUpdate(player)
    })
  }

  private removeListners = (player: VideoController) => {
    if (!player.videoElement?.current) return
    player.videoElement.current.removeEventListener('ended', (e) => {
      this.onPlayerEnded(player)
    })
    player.videoElement.current.removeEventListener('timeupdate', (e) => {
      this.onPlayerUpdate(player)
    })
  }
}
