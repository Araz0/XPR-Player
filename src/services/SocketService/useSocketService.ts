import { SocketService } from './socketService.service'

const socketService = new SocketService()

export function useSocketService() {
  return {
    socketService,
  }
}
