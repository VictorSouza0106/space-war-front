import { IGroundCard } from '../app/pages/board/board.interfaces';

export const ALL_GROUND_CARDS: IGroundCard[] = [
  {
    id: 201,
    type: 'ground',
    affectArea: [
      { col: 1, row: 1 },
      { col: 1, row: -1 },
      { col: -1, row: 1 },
      { col: -1, row: -1 },
    ],
    color: '#ff8143',
  },
];
