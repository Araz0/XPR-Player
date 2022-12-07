import { VideoRefElement } from '../../types'
import { VideoController } from '../VideoController'

export class ScreenController {
  private _player1: VideoController
  private _player2: VideoController
  private _selectedPlayer: VideoController

  constructor(ref1?: VideoRefElement, ref2?: VideoRefElement) {
    this._player1 = new VideoController('A', ref1 || undefined)
    this._player2 = new VideoController('B', ref2 || undefined)
    this._selectedPlayer = this._player1
  }
  public setRefs = (ref1: VideoRefElement, ref2: VideoRefElement) => {
    this._player1.videoElement = ref1
    this._player2.videoElement = ref2
  }
  public play = () => {
    this._selectedPlayer.play()
  }

  public pause = () => {
    this._selectedPlayer.pause()
  }
  public setSource = (src: string) => {
    this._selectedPlayer.setSource(src)
  }
  public setNextSource = (src: string) => {
    this._selectedPlayer.id === this._player1.id
      ? this._player2.setSource(src)
      : this._player1.setSource(src)
  }
}
