import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private authorizationService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const allowedRoles = route.data['allowedRoles'];
      const isAuthorized = this.authorizationService.isAuthorized(allowedRoles);
    
    if (!isAuthorized) {
        this.router.navigate(['/']);
      }
    
    return isAuthorized;
  }
  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data['allowedRoles'];
    const isAuthorized = this.authorizationService.isAuthorized(allowedRoles);
  
  if (!isAuthorized) {
      this.router.navigate(['accessdenied']);
    }
  
  return isAuthorized
  }
  
}
