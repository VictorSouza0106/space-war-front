import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor() {
    this.socket = io('http://localhost:3000');
  }

  private socket: Socket;

  emit(eventName: string, data: unknown) {
    this.socket.emit(eventName, data);
  }

  on(eventName: string, callback: () => {}) {
    this.socket.on(eventName, callback);
  }
}
