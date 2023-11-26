import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-stop-training',
    template: `<div style="padding: 20px;"><h1 mat-dialog-title>Are you sure?</h1>
                <p style="text-align: center;">You already finished {{ passedData.progress }}%</p>
                <mat-dialog-actions style="justify-content: center;">
                    <button mat-button [mat-dialog-close]="true">Yes</button>
                    <button mat-button [mat-dialog-close]="false">No</button>
                </mat-dialog-actions></div>`
})

export class StopTrainingComponent {

    // inject the material dialog data passed along from the dialog open function
    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }
}