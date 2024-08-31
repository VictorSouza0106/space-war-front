import { Routes } from '@angular/router';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { BoardComponent } from './pages/board/board.component';

export const routes: Routes = [
  {
    component: BoardComponent,
    path: '**',
    pathMatch: 'prefix',
  },
];
