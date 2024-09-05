export const IBoardCardType = {
  MOVE: 'move',
  BUFF: 'buff',
  GROUND: 'ground',
};

export interface IBoardCard {
  id: number;
  type: 'move' | 'buff' | 'ground';
  img?: string;
  color?: string;
  inspected?: boolean;
}

export interface IMoveCard extends IBoardCard {
  availableCords: ICordenate[];
}

export interface IBuffCard extends IBoardCard {}

export interface IGroundCard extends IBoardCard {
  affectArea: ICordenate[];
}

export interface ICordenate {
  col: number;
  row: number;
}

export interface IPlayer {
  col: number;
  row: number;
  visible?: boolean;
  color?: string;
  img?: string;
}

export interface ITarget {
  col: number;
  row: number;
}

export interface IMapElement {
  col: number;
  row: number;
  team: string | null;
}
