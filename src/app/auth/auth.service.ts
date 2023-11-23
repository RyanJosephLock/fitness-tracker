import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { Subject } from 'rxjs'
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { User } from './user.module';
import { AuthData } from './auth-data.module'
import { TrainingService } from '../training/training.service';

// Adding the router service into a service the @injectoable decoratory needs to be added
@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    // Make user object private so it can't be accessed directly outisde of this class
    private user!: User | null;

    constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService) { } 

    registerUser(authData: AuthData) {
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            console.log(result);
            this.authSuccessful();
        })
        .catch(error => {
            console.log(error);
        })
    }

    login(authData: AuthData) {
        this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            console.log(result);
            this.authSuccessful();
        })
        .catch(error => {
            console.log(error);
        })
    }

    logout() {
        this.trainingService.cancelSubscriptions();
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login'])
        this.afAuth.signOut();
        this.isAuthenticated = false;
    }

    isAuth() {
        // Return if user is logged in
        return this.isAuthenticated;
    }

    private authSuccessful() {
        this.isAuthenticated = true;
        // Send a true event 'next' for logged in Subject
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }

}