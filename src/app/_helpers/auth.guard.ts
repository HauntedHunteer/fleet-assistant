import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenStorageService } from '../account/token-storage.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: User;
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.user = this.tokenStorageService.getUser();

    if (this.user) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
