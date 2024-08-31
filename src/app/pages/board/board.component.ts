import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IBuffCard,
  IBoardCard,
  IBoardCardType,
  IGroundCard,
  IMoveCard,
  IPlayer,
  ITarget,
  IMapElement,
} from './board.interfaces';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  players: IPlayer[] = [
    { col: 3, row: 3, color: '#ffffff00', img: 'players/chicken/pintinho.png' },
    { col: 0, row: 5, color: '#6d0071' },
    { col: 5, row: 0, color: '#6d0071' },
    { col: 5, row: 5, color: '#ffff00' },
  ];

  cards: IBoardCard[] = [];

  MOCK_CARDS: IMoveCard[] = [
    {
      id: 2,
      color: '#5564dd',
      type: 'move',
      availableCords: [
        { col: 2, row: 0 },
        { col: 0, row: 2 },
      ],
      img: 'moveCards/move-card-2.png',
    },
    {
      id: 3,
      color: '#ff0055',
      type: 'move',
      availableCords: [
        { col: -1, row: 0 },
        { col: 0, row: -1 },
      ],
      img: 'moveCards/move-card-3.png',
    },
    {
      id: 4,
      color: '#00ff88',
      type: 'move',
      availableCords: [
        { col: 1, row: 0 },
        { col: 0, row: 1 },
      ],
      img: 'moveCards/move-card-1.png',
    },
    {
      id: 5,
      color: '#5564dd',
      type: 'move',
      availableCords: [
        { col: 2, row: 0 },
        { col: 0, row: 2 },
      ],
      img: 'moveCards/move-card-2.png',
    },
    {
      id: 6,
      color: '#ff0055',
      type: 'move',
      availableCords: [
        { col: -1, row: 0 },
        { col: 0, row: -1 },
      ],
      img: 'moveCards/move-card-3.png',
    },
  ];

  MOCK_GROUND_CARDS: IGroundCard[] = [
    {
      type: 'ground',
      affectArea: [
        { col: 1, row: 1 },
        { col: 1, row: -1 },
        { col: -1, row: 1 },
        { col: -1, row: -1 },
      ],
      id: 18,
      color: '#ff8143',
    },
  ];

  westearnMap: any[] = [];
  spaceMap: any[] = [];

  selectedCard: IBoardCard | null;
  count: number = 0;
  targets: ITarget[] = [];

  selfPlayer: IPlayer = this.players[0];

  ngOnInit(): void {
    this.cards = this.MOCK_GROUND_CARDS;
    this.callCard();
  }

  callCard() {
    if (this.cards.length === this.MOCK_CARDS.length) return;
    setTimeout(() => {
      this.cards.push(this.MOCK_CARDS[this.count]);
      this.count++;
      this.callCard();
    }, 2000);
  }

  movePlayer(player: { col: number; row: number }, col: number, row: number) {
    player.col = col;
    player.row = row;
  }

  useOnTarget(target: ITarget) {
    this.targets = [];

    switch (this.selectedCard?.type) {
      case IBoardCardType.MOVE:
        this.movePlayer(this.selfPlayer, target.col, target.row);

        let findMapElement = this.westearnMap.find((elem) => {
          console.log(
            elem,
            target,
            elem.col === target.col && elem.row === target.row
          );
          return elem.col === target.col && elem.row === target.row;
        });

        console.log(findMapElement);

        if (findMapElement) {
          setTimeout(() => {
            alert('ACONTECEU ALGO');
          }, 1100);
        }
        break;
      case IBoardCardType.GROUND:
        let mapElement = { col: target.col, row: target.row };
        this.westearnMap.push(mapElement);
    }

    let index = this.cards.findIndex(
      (card) => card.id === this.selectedCard?.id
    );
    this.cards.splice(index, 1);
    this.selectedCard = null;
  }

  setSelectedCard(card: IMoveCard | IBuffCard | IGroundCard) {
    this.selectedCard = card;

    switch (card.type) {
      case IBoardCardType.MOVE:
        let moveCard = card as IMoveCard;
        this.targets = [];

        moveCard.availableCords.forEach((coords) => {
          if (
            this.selfPlayer.col + coords.col < 0 ||
            this.selfPlayer.row + coords.row < 0 ||
            this.selfPlayer.col + coords.col > 5 ||
            this.selfPlayer.row + coords.row > 5
          )
            return;

          let targetCoords = {
            col: this.selfPlayer.col + coords.col,
            row: this.selfPlayer.row + coords.row,
          };

          this.targets.push(targetCoords);
        });
        break;
      case IBoardCardType.GROUND:
        let groundCard = card as IGroundCard;

        this.targets = [];

        groundCard.affectArea.forEach((coords) => {
          if (
            this.selfPlayer.col + coords.col < 0 ||
            this.selfPlayer.row + coords.row < 0 ||
            this.selfPlayer.col + coords.col > 5 ||
            this.selfPlayer.row + coords.row > 5
          )
            return;

          let targetCoords = {
            col: this.selfPlayer.col + coords.col,
            row: this.selfPlayer.row + coords.row,
          };

          this.targets.push(targetCoords);
        });
    }
  }

  inspectCard(card: IMoveCard | IBuffCard | IGroundCard) {
    if (card.inspected) {
      card.inspected = false;
    } else {
      this.cards.forEach((card) => (card.inspected = false));
      card.inspected = true;
    }
  }

  getPlayerStyle(player: IPlayer) {
    const columnPercent = player.col * 100;
    const rowPercent = player.row * 100;

    return {
      transform: `translate(${columnPercent}%, ${rowPercent}%)`,
      'background-color': player.color,
      'background-image': `url(../../../assets/${player.img})`,
    };
  }

  getMapItemStyle(target: ITarget | IMapElement) {
    const columnPercent = target.col * 100;
    const rowPercent = target.row * 100;

    return {
      transform: `translate(${columnPercent}%, ${rowPercent}%)`,
    };
  }

  getCardStyle(index: number, card: IBoardCard) {
    if (card.inspected) return this.getSelectedCardStyle(card);

    let totalCards = this.cards.length;
    let positionX: number = 0;
    let positionY: number = 0;
    let angle: number = 0;

    if (totalCards > 1) {
      positionX = -50 + (110 / (totalCards - 1)) * index;
    }

    if (totalCards >= 3) {
      angle = -5 * Math.floor(totalCards / 2) + 5 * index;
      positionY = Math.abs(angle);
    }

    return {
      transform: `translateX(${
        -50 + positionX
      }%) translateY(${positionY}%) rotate(${angle}deg)`,
      'background-image': `url(../../../assets/${card.img})`,
      'background-color': card.color,
    };
  }

  getSelectedCardStyle(card: IBoardCard) {
    return {
      transform: `translateX(-50%) translateY(-75%) scale(1.8)`,
      'background-image': `url(../../../assets/${card.img})`,
      'z-index': 99,
    };
  }
}
