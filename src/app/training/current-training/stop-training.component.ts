import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-stop-training',
    template: `<h1 mat-dialog-title>Are you sure?</h1>
                <p>You already finished {{ passedData.progress }}%</p>
                <mat-dialog-actions>
                    <button mat-button [mat-dialog-close]="true">Yes</button>
                    <button mat-button [mat-dialog-close]="false">No</button>
                </mat-dialog-actions>`
})

export class StopTrainingComponent {

    // inject the material dialog data passed along from the dialog open function
    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }
}