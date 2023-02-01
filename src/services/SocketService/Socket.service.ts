import { io } from 'socket.io-client'

export class SocketService {
  private _socket: any // todo: add type
  constructor(port = 8000) {
    if (!this._socket) {
      this._socket = io('http://localhost:' + port)
      this._socket.emit('client-connected', 'A new client connected')
    }
  }
  public start = () => {
    this._socket.emit('start-program', { payload: 'pls', headerId: 1 })
  }
  public onStart = (exicute: () => void) => {
    this._socket.on('start-program', (command: any) => {
      // eslint-disable-next-line no-console
      console.log(`Received command: ${command}`, new Date().getMilliseconds())
      exicute()
    })
  }
}
