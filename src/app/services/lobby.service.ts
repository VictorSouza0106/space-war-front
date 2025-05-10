import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { first, Subject } from 'rxjs';
import { SocketIOService } from './socket.service';
import { ILobby, ISocketMessage, IUser } from '../pages/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LobbyService extends BaseService {
  public LOBBY_BASE_REF = this.BASE_REF + '/lobby/';

  public lobby: ILobby;
  public $lobbySubject: Subject<ILobby> = new Subject<ILobby>();
  public $lobbySocketSubject: Subject<any> = new Subject<any>();

  constructor(private socket: SocketIOService) {
    super();
  }

  public async getLobby(roomCode: string) {
    this.http
      .get(`${this.LOBBY_BASE_REF}${roomCode}`)
      .pipe(first())
      .subscribe((res) => {
        this.lobby = res as ILobby;
        this.$lobbySubject.next(this.lobby);
        this.lobbyMessageListener(this.lobby.roomCode);
      });
  }

  public async createLobby(user: IUser) {
    this.http.post(`${this.LOBBY_BASE_REF}`, user).subscribe((res) => {
      this.lobby = res as ILobby;
      this.$lobbySubject.next(res as ILobby);
      this.lobbyMessageListener(this.lobby.roomCode);
    });
  }

  public addUserToLobby(user: IUser) {
    this.http
      .put(`${this.LOBBY_BASE_REF}addUser/${this.lobby.roomCode}`, user)
      .subscribe((res) => {
        this.$lobbySubject.next(res as ILobby);
      });
  }

  public reconnectUserOnLobby(user: IUser) {
    this.http
      .put(`${this.LOBBY_BASE_REF}/reconnectUser/${this.lobby.roomCode}`, user)
      .subscribe((res) => {
        this.$lobbySubject.next(res as ILobby);
      });
  }

  private lobbyMessageListener(roomCode: string) {
    this.socket.on(roomCode, (socketMessage: ISocketMessage<ILobby>) => {
      switch (socketMessage.type) {
        case 'lobbyUser':
          this.lobby.users = socketMessage.data.users;
          this.$lobbySubject.next(this.lobby);
          break;

        default:
          break;
      }
      this.$lobbySocketSubject.next(socketMessage);
    });
  }
}
