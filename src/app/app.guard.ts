import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { AngularFireAuth } from 'angularfire2';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AngularFireAuth) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.take(1)
      .map((user) => Boolean(user))
      .do(authenticated => {
        console.log('AuthGuard:authenticated', authenticated);
        if (!authenticated) {
          return this.router.navigate(['/login']);
        }
      });
  }
}

@Injectable()
export class UnAuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AngularFireAuth) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.take(1)
      .map((user) => !Boolean(user))
      .do(unauthenticated => {
        console.log('UnAuthGuard:unauthenticated', !unauthenticated);
        if (!unauthenticated) {
          return this.router.navigate(['/']);
        }
      });
  }
}
