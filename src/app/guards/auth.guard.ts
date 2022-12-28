import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loggedIn:boolean=false;

  constructor (private authService:AuthService, private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const status=this.loginStatus();
    return status;
  }

  private loginStatus():boolean {
    this.authService.isLoggedIn().subscribe({
      next: (stat) => this.loggedIn=stat,
      error: () => this.router.navigate(['/login'])
    });
    return this.loggedIn;
  }
}
