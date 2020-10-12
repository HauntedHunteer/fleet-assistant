import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

import { TokenStorageService } from '../account/token-storage.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
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
    if (this.user && this.user.role === 'ADMIN') {
      return true;
    }

    this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}