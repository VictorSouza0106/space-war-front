import { Injectable } from '@angular/core';
import { IGroundCard, IMoveCard } from '../pages/board/board.interfaces';
import { ALL_MOVE_CARDS } from '../../utils/move-cards';
import { ALL_GROUND_CARDS } from '../../utils/ground-cards';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private MAX_CARD_ON_HANDS = 6;

  constructor() {}

  private getRandomNumberByLength(length: number): number {
    return Math.floor(Math.random() * length);
  }

  getMaxCardOnHands() {
    return this.MAX_CARD_ON_HANDS;
  }

  startedCards() {
    return [
      this.buyGroundCard(),
      this.buyMoveCard(),
      this.buyMoveCard(),
      this.buyMoveCard(),
    ];
  }

  buyMoveCard(): IMoveCard {
    const randonNum = this.getRandomNumberByLength(ALL_MOVE_CARDS.length);
    return ALL_MOVE_CARDS[randonNum];
  }

  buyGroundCard(): IGroundCard {
    const randonNum = this.getRandomNumberByLength(ALL_GROUND_CARDS.length);
    return ALL_GROUND_CARDS[randonNum];
  }
}
