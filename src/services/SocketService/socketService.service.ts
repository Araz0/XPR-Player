import { io } from 'socket.io-client'

import { EventNames, ProgramType } from 'types'

export class SocketService {
  private _serverUrl = 'http://localhost:8000'
  private _socket = io(this._serverUrl)
  constructor() {
    console.log('SocketService is created')
  }

  public disconnect = () => {
    this._socket.disconnect()
  }

  private emmit = (EventName: string, commandPackage: any) => {
    this._socket.emit(EventName, commandPackage)
  }
  public emmitProgram = (program: ProgramType) => {
    this.emmit(EventNames.SET_PROGRAM, program)
  }

  public emmitStartProgram = () => {
    this.emmit(EventNames.START_PROGRAM, 'admin requested program start')
  }

  public emmitRequestFullscreen = () => {
    this.emmit(EventNames.REQUEST_FULLSCREEN, 'admin requested full screen')
  }

  public emmitStopProgram = () => {
    this.emmit(EventNames.STOP_PROGRAM, 'admin requested program stop')
  }

  public emmitPauseProgram = () => {
    this.emmit(EventNames.PAUSE_PROGRAM, 'admin requested program pause')
  }

  public emmitResetProgram = () => {
    this.emmit(EventNames.RESET_PROGRAM, 'admin requested program reset')
  }

  public emmitShowControls = () => {
    this.emmit(EventNames.SHOW_CONTROLS, 'admin requested show controls')
  }

  public emmitHideControls = () => {
    this.emmit(EventNames.HIDE_CONTROLS, 'admin requested hide controls')
  }

  public emmitToggleShowControls = () => {
    this.emmit(
      EventNames.TOGGLE_SHOW_CONTROLS,
      'admin requested toggle show controls'
    )
  }

  public emmitSelectedScreenIndex = (index: number) => {
    this.emmit(EventNames.USER_SELECTED_SEGMENT, index)
  }

  public onAnything = (exicute: (withData?: any) => void) => {
    this._socket.onAny((eventName: any, args) => {
      exicute(`(${eventName}):  | ⌚ ${new Date().getMilliseconds()}`)
    })
  }
  private onLisiten = (
    eventName: string,
    exicute: (withData?: any) => void,
    exicuteWithData?: boolean
  ) => {
    this._socket.on(eventName, (data: any) => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (${eventName}): ${data}`,
        new Date().getMilliseconds()
      )
      exicuteWithData ? exicute(data) : exicute()
    })
  }

  public onSetProgram = (exicute: (program: ProgramType) => void) => {
    this.onLisiten(EventNames.SET_PROGRAM, exicute, true)
  }

  public onStart = (exicute: () => void) => {
    this.onLisiten(EventNames.START_PROGRAM, exicute)
  }

  public onPause = (exicute: () => void) => {
    this.onLisiten(EventNames.PAUSE_PROGRAM, exicute)
  }

  public onReset = (exicute: () => void) => {
    this.onLisiten(EventNames.RESET_PROGRAM, exicute)
  }

  public onRequestFullScreen = (exicute: () => void) => {
    this.onLisiten(EventNames.REQUEST_FULLSCREEN, exicute)
  }

  public onShowControls = (exicute: () => void) => {
    this.onLisiten(EventNames.SHOW_CONTROLS, exicute)
  }

  public onHideControls = (exicute: () => void) => {
    this.onLisiten(EventNames.HIDE_CONTROLS, exicute)
  }

  public onUserSelectedNextSegment = (
    exicute: (selectedNextSegmentIndex: number) => void
  ) => {
    this.onLisiten(EventNames.USER_SELECTED_SEGMENT, exicute, true)
  }

  public onToggleShowControls = (exicute: () => void) => {
    this.onLisiten(EventNames.TOGGLE_SHOW_CONTROLS, exicute)
  }
}
