import io, { Socket } from 'socket.io-client';

// Replace with your actual server URL
// For Android emulator, use 10.0.2.2 instead of localhost
const SERVER_URL = 'https://localkaamserver.onrender.com'; 

class SocketService {
  private socket: Socket | null = null;
  private static instance: SocketService;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect(): Socket {
    if (!this.socket) {
      console.log('[SocketService] Connecting to', SERVER_URL);
      this.socket = io(SERVER_URL, {
        transports: ['websocket'],
        forceNew: true,
      });

      this.socket.on('connect', () => {
        console.log('[SocketService] Connected:', this.socket?.id);
      });

      this.socket.on('disconnect', () => {
        console.log('[SocketService] Disconnected');
      });

      this.socket.on('connect_error', err => {
        console.error('[SocketService] Connection error:', err);
      });
    }
    return this.socket;
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public joinRequestRoom(requestId: string): void {
    if (this.socket) {
      console.log('[SocketService] Joining room:', requestId);
      this.socket.emit('join_request', requestId);
    }
  }

  public onQuoteReceived(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('quote_received', callback);
    }
  }

  public offQuoteReceived(): void {
    if (this.socket) {
      this.socket.off('quote_received');
    }
  }

  public onNewVideo(callback: (video: any) => void): void {
    if (this.socket) {
      this.socket.on('new_video', callback);
    }
  }

  public offNewVideo(): void {
    if (this.socket) {
      this.socket.off('new_video');
    }
  }
}

export default SocketService.getInstance();
