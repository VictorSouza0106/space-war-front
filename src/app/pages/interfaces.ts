import { ITeam } from './lobby/lobby.component';

export interface ILobby {
  roomCode: string;
  users: IUser[];
  gameStatus: 'lobby' | 'game' | 'ended';
  gameConfigs: any;
  gameTeams: ITeam[];
}

export interface IUser {
  username: string;
  connected?: boolean;
  isMaster?: boolean;
}
export interface ISocketMessage<T> {
  roomCode: string;
  data: T;
}
