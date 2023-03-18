import { SocketService } from 'services/SocketService/socketService.service'

const socketService = new SocketService()

export function useSocketService() {
  return {
    socketService,
  }
}
