import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {
  constructor(public authService: AuthService) { }

  // This method can be used to log out the user
  logout() {
    this.authService.logout();
    localStorage.removeItem('user');
    // Redirect to login or home page after logout
    window.location.href = '/login';
  }

}
