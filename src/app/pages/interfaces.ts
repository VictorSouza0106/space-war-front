export interface ILobby {
  roomCode: string;
  users: IUser[];
  gameStatus: 'lobby' | 'game' | 'ended';
}

export interface IUser {
  username: string;
  connected?: boolean;
  isMaster?: boolean;
}
export interface ISocketMessage<T> {
  type: string;
  data: T;
}
