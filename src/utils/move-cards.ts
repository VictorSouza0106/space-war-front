import { IMoveCard } from '../app/pages/board/board.interfaces';

export const ALL_MOVE_CARDS: IMoveCard[] = [
  {
    id: 101,
    color: '#00ff88',
    type: 'move',
    availableCords: [
      { col: 1, row: 0 },
      { col: 0, row: 1 },
    ],
    img: 'moveCards/move-card-1.png',
  },
  {
    id: 102,
    color: '#5564dd',
    type: 'move',
    availableCords: [
      { col: 2, row: 0 },
      { col: 0, row: 2 },
    ],
    img: 'moveCards/move-card-2.png',
  },
  {
    id: 103,
    color: '#ff0055',
    type: 'move',
    availableCords: [
      { col: -1, row: 0 },
      { col: 0, row: -1 },
    ],
    img: 'moveCards/move-card-3.png',
  },
];
