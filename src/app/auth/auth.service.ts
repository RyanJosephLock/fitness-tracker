import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { Subject } from 'rxjs'
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { User } from './user.module';
import { AuthData } from './auth-data.module'
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

// Adding the router service into a service the @injectoable decoratory needs to be added
@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    // Make user object private so it can't be accessed directly outisde of this class
    private user!: User | null;

    constructor(
        private router: Router, 
        private afAuth: AngularFireAuth, 
        private trainingService: TrainingService,
        private uiService: UIService,
    ) { } 

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                // Send a true event 'next' for logged in Subject
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.isAuthenticated = false;
                this.trainingService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['/login'])
            }
        });
    }

    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            this.uiService.loadingStateChanged.next(false);
        })
        .catch(error => {
            this.uiService.showSnackBar(error.message, '', 3000);
        this.uiService.loadingStateChanged.next(false);
        })
    }

    login(authData: AuthData) {
        this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            this.uiService.loadingStateChanged.next(true);
        })
        .catch(error => {
            this.uiService.showSnackBar(error.message, '', 3000);
        })
        this.uiService.loadingStateChanged.next(false);
    }

    logout() {
        this.afAuth.signOut();
    }

    isAuth() {
        // Return if user is logged in
        return this.isAuthenticated;
    }

}