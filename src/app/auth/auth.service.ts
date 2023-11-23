import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { Subject } from 'rxjs'


import { User } from './user.module';
import { AuthData } from './auth-data.module'

// Adding the router service into a service the @injectoable decoratory needs to be added
@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();

    // Make user object private so it can't be accessed directly outisde of this class
    private user!: User | null;

    constructor(private router: Router ) { } 

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccessful();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccessful();
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login'])
    }

    getUser() {
        // Use the object spread to create duplicate, different object to avoid the user being mutated by other components
        return { ...this.user};
    }

    isAuth() {
        // Return if user is logged in
        return this.user != null;
    }

    private authSuccessful() {
        // Send a true event 'next' for logged in Subject
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }

}