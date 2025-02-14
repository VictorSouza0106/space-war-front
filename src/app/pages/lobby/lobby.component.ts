import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IUsers } from '../interfaces';
import { CharacterSelectorComponent } from '../../components/character-selector/character-selector.component';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [CommonModule, CharacterSelectorComponent],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss',
})
export class LobbyComponent implements OnInit {
  connectedUsers: IUsers[];

  hasNickname: boolean = false;

  MOCK_USER: Array<IUsers> = [
    {
      isMaster: true,
      nickname: 'Tadeu',
      uid: 1,
    },
    {
      isMaster: true,
      nickname: 'Tadeu',
      uid: 2,
    },
    {
      isMaster: true,
      nickname: 'Tadeu',
      uid: 3,
    },
    {
      isMaster: true,
      nickname: 'Tadeu',
      uid: 4,
    },
    {
      isMaster: true,
      nickname: 'Tadeu',
      uid: 5,
    },
    {
      isMaster: true,
      nickname: 'Tadeu',
      uid: 6,
    },
    {
      isMaster: true,
      nickname: 'Tadeu',
      uid: 7,
    },
    {
      isMaster: true,
      nickname: 'Tadeu',
      uid: 8,
    },
  ];

  teams: any[] = [
    {
      primaryColor: '#A95CDB',
      secondaryColor: '#A95CDB80',
    },
    {
      primaryColor: '#5665DB',
      secondaryColor: '#5665DB80',
    },
    {
      primaryColor: '#4BDB94',
      secondaryColor: '#4BDB9480',
    },
    {
      primaryColor: '#DB944B',
      secondaryColor: '#DB944B80',
    },
  ];

  ngOnInit(): void {
    this.connectedUsers = this.MOCK_USER;
  }

  setNickname() {
    this.hasNickname = true;
  }
}
