import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<User | null> | undefined;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.currentUser$ = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
  }
}
