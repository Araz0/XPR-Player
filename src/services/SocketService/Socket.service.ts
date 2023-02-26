import { io, Socket } from 'socket.io-client'

import { EventNames } from './eventNames'
import { ProgramType } from '../../types'

export class SocketService {
  private _socket: Socket

  constructor(port = 8000) {
    this._socket = io('http://localhost:' + port)
    this._socket.emit(EventNames.CLIENT_CONNECTED, 'A new client connected')
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
  public onSetProgram = (exicute: (program: ProgramType) => void) => {
    this._socket.on(EventNames.SET_PROGRAM, (program: ProgramType) => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (Set Program): `,
        new Date().getMilliseconds()
      )
      exicute(program)
    })
  }
  public onEndStandby = (exicute: () => void) => {
    this._socket.on(EventNames.END_STANDBY, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (End Standby): `,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }
  public onShowControls = (exicute: () => void) => {
    this._socket.on(EventNames.SHOW_CONTROLS, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (Show Controls): `,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }
  public onHideControls = (exicute: () => void) => {
    this._socket.on(EventNames.HIDE_CONTROLS, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (Hide Controls): `,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }
  public onToggleShowControls = (exicute: () => void) => {
    this._socket.on(EventNames.TOGGLE_SHOW_CONTROLS, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (Toggle Show Controls): `,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }
}
