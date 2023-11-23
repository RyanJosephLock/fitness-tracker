// Note: AuthGuard is depreciated, updated guide here: https://angular.io/guide/router-tutorial-toh#canactivate-requiring-authentication

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private authService: AuthService, private router:Router) { }

    canActivate() {
        // Return true isAuth() is true (logged in)
        if(this.authService.isAuth()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}