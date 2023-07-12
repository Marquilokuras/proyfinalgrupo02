/* import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    
    return this.authService.verificarId().pipe(map((res: any) => {
      console.log(res.status)
      if (res.status == '1') {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }))
  }
  
} */