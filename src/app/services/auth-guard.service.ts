import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private userService: UsersService, private router: Router) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    return this.userService.testLogin().pipe(map((response: {
      authenticated: boolean}) => {
        console.log(response);
        if (response) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      }), catchError((error) => {
        this.router.navigate(['/login']);
        return of(false);
      })
    )
  }

}
