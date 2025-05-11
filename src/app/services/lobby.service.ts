import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { first, Subject } from 'rxjs';
import { SocketIOService } from './socket.service';
import { ILobby, ISocketMessage, IUser } from '../pages/interfaces';
import { ITeam } from '../pages/lobby/lobby.component';

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
      .get(`${this.LOBBY_BASE_REF}${roomCode}`, this.getRequestOptions())
      .pipe(first())
      .subscribe((res) => {
        this.lobby = res as ILobby;
        this.$lobbySubject.next(this.lobby);
        this.lobbyMessageListener();
      });
  }

  public async createLobby(user: IUser) {
    this.http
      .post(`${this.LOBBY_BASE_REF}`, user, this.getRequestOptions())
      .subscribe((res) => {
        this.lobby = res as ILobby;
        this.$lobbySubject.next(res as ILobby);
        this.lobbyMessageListener();
      });
  }

  public addUserToLobby(user: IUser) {
    this.http
      .put(`${this.LOBBY_BASE_REF}addUser/${this.lobby.roomCode}`, user, {
        withCredentials: true,
      })
      .subscribe((res) => {
        this.$lobbySubject.next(res as ILobby);
      });
  }

  public reconnectUserOnLobby(user: IUser) {
    this.http
      .put(
        `${this.LOBBY_BASE_REF}/reconnectUser/${this.lobby.roomCode}`,
        user,
        this.getRequestOptions()
      )
      .subscribe((res) => {
        this.$lobbySubject.next(res as ILobby);
      });
  }

  public emitLobbyMessage(teams: ITeam[]) {
    this.lobby.gameTeams = teams;

    let message: ISocketMessage<ILobby> = {
      roomCode: this.lobby.roomCode,
      data: this.lobby,
    };

    this.socket.emit('client_message', message);
  }

  private lobbyMessageListener() {
    this.socket.on('updateLobby', (lobby: ILobby) => {
      this.lobby = lobby;
      this.$lobbySubject.next(this.lobby);
    });
  }
}
