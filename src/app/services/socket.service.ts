import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class SocketIOService extends BaseService {
  constructor() {
    super();
    this.socket = io(this.BASE_REF, {
      transports: ['websocket'],
      withCredentials: true,
    });
  }

  private socket: Socket;

  emit(eventName: string, data: unknown) {
    this.socket.emit(eventName, data);
  }

  on(eventName: string, callback: any) {
    this.socket.on(eventName, callback);
  }
}
