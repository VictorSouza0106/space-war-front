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

  selectedTeam: ITeam;

  roomCode: string | null;

  lobbySocketSubscription: Subscription;

  get lobby(): ILobby {
    return this.lobbyService.lobby;
  }

  get teams(): ITeam[] {
    return this.lobbyService.lobby?.gameTeams;
  }

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

    this.lobbyService.$lobbySubject.pipe(first()).subscribe((lobby) => {
      if (!this.roomCode) this.setRoomCodeQueryParams();
      this.connectPlayer();
    });
  }

  ngOnDestroy(): void {
    this.lobbySocketSubscription.unsubscribe();
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
    if (team.players.cat || team.players.chicken) return;

    if (this.selectedTeam) {
      let selectedTeam = this.teams.find(
        (arrTeam) => this.selectedTeam.teamName === arrTeam.teamName
      ) as ITeam;
      selectedTeam.players = { cat: null, chicken: null };
    }

    team.players.cat = this.user?.username as string;
    team.players.chicken = this.user?.username as string;
    this.selectedTeam = team;

    this.lobbyService.emitLobbyMessage(this.teams);
  }

  createLobby() {
    this.lobbyService.createLobby({ username: this.username });
    this.hasUsername = true;
    this.setUser();
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
    chicken: string | null;
    cat: string | null;
  };
}
