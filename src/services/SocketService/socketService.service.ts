import { io } from 'socket.io-client'

import { EventLog, EventNames, ProgramType } from 'types'

export class SocketService {
  private _serverUrl = 'http://localhost:8000'
  private _socket = io(this._serverUrl)

  public disconnect = () => {
    this._socket.disconnect()
  }

  public resetHostAddressTo = (address: string) => {
    this._socket.disconnect()
    this._socket = io(`http://${address}:8000`)
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
  public emmitStartProgramWithDelay = () => {
    const exicuteTimestamp = Date.now() + 1000
    this.emmit(EventNames.START_PROGRAM, exicuteTimestamp)
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

  public emmitScreenIsReady = (screenId: number) => {
    this.emmit(EventNames.SCREEN_IS_READY, screenId)
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

  public emmitIdentifyScreens = () => {
    this.emmit(EventNames.IDENTIFY_SCREENS, 'admin identifing screens')
  }

  public onAnything = (exicute: (log: EventLog) => void) => {
    this._socket.onAny((eventName: string, args) => {
      exicute({ event: eventName, timestamp: Date.now() })
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

  public onStart = (exicute: (startTimestamp: number) => void) => {
    this.onLisiten(EventNames.START_PROGRAM, exicute, true)
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

  public onScreenIsReady = (exicute: (screenId: number) => void) => {
    this.onLisiten(EventNames.SCREEN_IS_READY, exicute, true)
  }

  public onToggleShowControls = (exicute: () => void) => {
    this.onLisiten(EventNames.TOGGLE_SHOW_CONTROLS, exicute)
  }

  public onIdentifyScreens = (exicute: () => void) => {
    this.onLisiten(EventNames.IDENTIFY_SCREENS, exicute, true)
  }
}
