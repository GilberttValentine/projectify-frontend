import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionAuthService } from '../services/security/session-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: SessionAuthService,
    private router: Router
  ) {}

  canActivate() {
    if (!this.authService.isLogged()) {
      this.router.navigate(['/auth/login']);

      return false;
    }

    return true;
  }
}
