import { Routes } from '@angular/router';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { BoardComponent } from './pages/board/board.component';

export const routes: Routes = [
  {
    path: 'lobby',
    component: LobbyComponent,
  },
  {
    component: BoardComponent,
    path: '**',
    pathMatch: 'prefix',
  },
];
