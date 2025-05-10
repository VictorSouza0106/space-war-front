import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketIOService {
  constructor() {
    this.socket = io('http://localhost:3000');
  }

  private socket: Socket;

  emit(eventName: string, data: unknown) {
    this.socket.emit(eventName, data);
  }

  on(eventName: string, callback: any) {
    this.socket.on(eventName, callback);
  }
}
