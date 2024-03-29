import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilService } from 'src/app/Services/util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private util: UtilService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const loggedin = this.util.isLoggedIn();
    const allowedusertypes = next.data.allowedusertypes;
    const isAuthorized = this.util.isAthourized(allowedusertypes);
    if (loggedin){
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.util.warningSnackbar('Please login to continue')
    this.router.navigate(['/account/login']);
    return false;
  }
  
}
