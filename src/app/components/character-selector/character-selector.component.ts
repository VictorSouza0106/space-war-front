import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
} from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-character-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-selector.component.html',
  styleUrl: './character-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSelectorComponent {
  playerType = input<PlayersType>('chicken');

  private _selectedCharacterIndex: number = 0;

  get playersImgs() {
    return PLAYERS_TYPES_IMGS[this.playerType()];
  }

  get selectedCharacterIndex() {
    return this._selectedCharacterIndex;
  }

  get selectedCharacter() {
    console.log(PLAYERS_TYPES_IMGS[this.playerType()]);
    return PLAYERS_TYPES_IMGS[this.playerType()][this.selectedCharacterIndex];
  }

  set selectedCharacterIndex(value: number) {
    this._selectedCharacterIndex = value;
    if (value < 0) this._selectedCharacterIndex = 0;
    if (value === this.playersImgs.length)
      this._selectedCharacterIndex = this.playersImgs.length - 1;
  }

  slideCharacter(direction: boolean): void {
    if (direction) this.selectedCharacterIndex++;
    else this.selectedCharacterIndex--;

    console.log(this.selectedCharacterIndex);
    gsap.to('.' + this.playerType(), { x: -155 * this.selectedCharacterIndex });
  }
}

type PlayersType = 'chicken' | 'cats';

const PLAYERS_TYPES_IMGS = {
  chicken: [
    'chicken/pintinho_1.png',
    'chicken/pintinho_2.png',
    'chicken/pintinho_1.png',
    'chicken/pintinho_2.png',
  ],
  cats: [
    'cats/gatinho.png',
    'cats/gatinho.png',
    'cats/gatinho.png',
    'cats/gatinho.png',
  ],
};
