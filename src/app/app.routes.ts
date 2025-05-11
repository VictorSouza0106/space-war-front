import { Routes } from '@angular/router';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { BoardComponent } from './pages/board/board.component';
import { ResetUserComponent } from './utils/reset-user/reset-user.component';

export const routes: Routes = [
  {
    path: 'lobby',
    component: LobbyComponent,
  },
  {
    path: 'lobby/:roomCode',
    component: LobbyComponent,
  },
  {
    path: 'r-user',
    component: ResetUserComponent,
  },
  {
    path: 'game',
    component: BoardComponent,
  },
  {
    component: LobbyComponent,
    path: '**',
    pathMatch: 'prefix',
  },
];
