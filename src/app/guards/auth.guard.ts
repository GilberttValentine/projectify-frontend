import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionAuthService } from '../services/security/session-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: SessionAuthService,
    private router: Router,
  ) {}

  canActivate() {
    if (!this.authService.isLogged()) {
      this.router.navigate(['/auth/login']);

      return false;
    }

    return true;
  }
}
