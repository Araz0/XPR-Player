import { io } from 'socket.io-client'

import { EventNames, ProgramType } from 'types'

export class SocketService {
  private _serverUrl = 'http://localhost:8000'
  private _socket = io(this._serverUrl)
  constructor() {
    console.log('SocketService is created')
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

  public onLisiten = (
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
    this._socket.on(EventNames.SET_PROGRAM, (program: ProgramType) => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (set-program): `,
        new Date().getMilliseconds()
      )
      exicute(program)
    })
  }

  public onStart = (exicute: () => void) => {
    this._socket.on(EventNames.START_PROGRAM, (data: any) => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (start-program): ${data}`,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }

  public onPause = (exicute: () => void) => {
    this._socket.on(EventNames.PAUSE_PROGRAM, (data: any) => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (pause-program): ${data}`,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }

  public onReset = (exicute: () => void) => {
    this._socket.on(EventNames.RESET_PROGRAM, (data: any) => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (reset-program): ${data}`,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }

  public onRequestFullScreen = (exicute: () => void) => {
    this._socket.on(EventNames.REQUEST_FULLSCREEN, (data: any) => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (request-full-screen): ${data}`,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }

  public onShowControls = (exicute: () => void) => {
    this._socket.on(EventNames.SHOW_CONTROLS, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (show-controls): `,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }

  public onHideControls = (exicute: () => void) => {
    this._socket.on(EventNames.HIDE_CONTROLS, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (hide-controls): `,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }

  public onUserSelectedNextSegment = (
    exicute: (selectedNextSegmentIndex: number) => void
  ) => {
    this._socket.on(
      EventNames.USER_SELECTED_SEGMENT,
      (selectedNextSegmentIndex: number) => {
        // eslint-disable-next-line no-console
        console.log(
          `Received command (user-selected-segment): `,
          new Date().getMilliseconds()
        )
        exicute(selectedNextSegmentIndex)
      }
    )
  }

  public onToggleShowControls = (exicute: () => void) => {
    this._socket.on(EventNames.TOGGLE_SHOW_CONTROLS, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (toggle-show-controls): `,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }
}
