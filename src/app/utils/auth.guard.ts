import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Constants } from './constants';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (localStorage.getItem(Constants.LocalStorageKey.LOCAL_STORAGE_USER_ID_KEY)) {
            return true;
        }
        else {
            console.log('userId is invaild');
            this.router.navigate(['/login']);
            return false;
        }

    }

}