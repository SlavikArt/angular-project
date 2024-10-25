import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginComponent],
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user$ = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout()
      .then(() => {
        console.log('User logged out');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }
}
