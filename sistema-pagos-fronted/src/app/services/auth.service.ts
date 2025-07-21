import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public username: any;
  public isAuthenticated: boolean = false;
  public roles: string[] = [];
  constructor(private router: Router) { }
  public users: any = {
    admin: { password: '123', roles: ['ESTUDIANTE', 'ADMIN'] },
    user1: { password: '123', roles: ['ESTUDIANTE'] },
  }

  public login(username: string, password: string): boolean {
    if (this.users[username] && this.users[username].password === password) {
      localStorage.setItem('user', JSON.stringify(this.users[username]));
      this.username = username;
      this.isAuthenticated = true;
      this.roles = this.users[username]['roles'];
      return true;
    }
    return false;
  }
  logout() {
    localStorage.removeItem('user');
    this.isAuthenticated = false;
    this.roles = [];
    this.username = null;
    this.router.navigate(['/login']);
  }
}
