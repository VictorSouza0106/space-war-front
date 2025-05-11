import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-user',
  standalone: true,
  imports: [],
  templateUrl: './reset-user.component.html',
  styleUrl: './reset-user.component.scss',
})
export class ResetUserComponent {
  ngOnInit(): void {
    window.localStorage.removeItem('LU');
  }
}
