import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean |UrlTree > | Promise<boolean |UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated) {
       alert('MENSAJE GUARD ');
      return true;
    } else {
      this.router.navigateByUrl('/login ');
      alert('Por favor, inicia sesión para continuar SONSO DE M.');
      return false;
    }
  }
}
