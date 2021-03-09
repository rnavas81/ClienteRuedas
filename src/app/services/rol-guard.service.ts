import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class RolGuardService implements CanActivate{

  constructor(private userService: UsersService, private router: Router) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    return this.userService.testRol().pipe(map((response: {
      authenticated: boolean}) => {
        console.log(response);
        if (response['rol'] == 1) {
          return true;
        }
        this.router.navigate(['/main']);
        return false;
      }), catchError((error) => {
        this.router.navigate(['/main']);
        return of(false);
      })
    )
  }
}
