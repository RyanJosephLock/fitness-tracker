import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UIService {
    loadingStateChanged = new Subject<boolean>();

    constructor(
        private snackbar: MatSnackBar
    ) {}

    showSnackBar(message: string, action: string, duration: number) {
        this.snackbar.open(message, action, {
            duration: duration
        });
    }
}