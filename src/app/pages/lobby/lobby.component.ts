import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILobby, IUser } from '../interfaces';
import { CharacterSelectorComponent } from '../../components/character-selector/character-selector.component';
import { LobbyService } from '../../services/lobby.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { first, Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [CommonModule, FormsModule, CharacterSelectorComponent],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss',
})
export class LobbyComponent implements OnInit, OnDestroy {
  hasUsername: boolean = false;
  user: IUser | null;

  username: string;

  roomCode: string | null;

  lobbySubscription: Subscription;

  get lobby() {
    return this.lobbyService.lobby;
  }

  teams: any[] = [
    {
      primaryColor: '#A95CDB',
      secondaryColor: '#A95CDB80',
      teamName: 'purple',
      players: {
        chicken: 'CHIC',
        cat: 'CAT',
      },
    },
    {
      primaryColor: '#5665DB',
      secondaryColor: '#5665DB80',
      teamName: 'blue',
      players: {
        chicken: '',
        cat: '',
      },
    },
    {
      primaryColor: '#4BDB94',
      secondaryColor: '#4BDB9480',
      teamName: 'green',
      players: {
        chicken: '',
        cat: '',
      },
    },
    {
      primaryColor: '#DB944B',
      secondaryColor: '#DB944B80',
      teamName: 'orange',
      players: {
        chicken: '',
        cat: '',
      },
    },
  ];

  constructor(
    private lobbyService: LobbyService,
    private userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.userService.loggedUser;
    this.roomCode = this.activeRoute.snapshot.queryParamMap.get('rc');

    if (this.roomCode) this.lobbyService.getLobby(this.roomCode);

    this.lobbySubscription = this.lobbyService.$lobbySubject
      .pipe(first())
      .subscribe((lobby) => {
        if (!this.roomCode) this.setRoomCodeQueryParams();
        this.connectPlayer();
      });
  }

  ngOnDestroy(): void {
    this.lobbySubscription.unsubscribe();
  }

  setUser() {
    let guestUser: IUser = {
      username: this.username,
    };

    this.user = guestUser;
    this.lobbyService.addUserToLobby(guestUser);
    this.userService.loggedUser = guestUser;
  }

  chooseTeam(animalType: 'chicken' | 'cat', team: ITeam): void {
    team.players[animalType] = this.user?.username as string;
  }

  createLobby() {
    this.lobbyService.createLobby({ username: this.username });
    this.hasUsername = true;
  }

  private setRoomCodeQueryParams() {
    this.roomCode = this.lobby.roomCode;
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: { rc: this.lobby.roomCode },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  private connectPlayer() {
    let loggedUser = this.lobby.users.find(
      (user) => user.username === this.user?.username
    );
    if (!loggedUser) return;

    this.user = loggedUser;
    this.lobbyService.reconnectUserOnLobby(loggedUser);
  }
}

export interface ITeam {
  primaryColor: string;
  secondaryColor: string;
  teamName: string;
  players: {
    chicken: string;
    cat: string;
  };
}
