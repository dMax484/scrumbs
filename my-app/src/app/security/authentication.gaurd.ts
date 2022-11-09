import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';

//receive token, validate signature is unchanged
//if changed, terminate session

@Injectable({ providedIn: 'root'})
export class AuthenticationGaurd implements CanActivate{

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{

        //TEST TEST TEST
        console.log("Auth Gaurd check: ", state)
        return true;

        if (this.authenticationService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/login']), { queryParams: {returnUrl: state.url}};
        return false;
    }
}