import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'

import { StopTrainingComponent } from './stop-training.component'
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit{
  progress: number = 0;
  timer!: ReturnType<typeof setInterval> // ! can be used to avoid needing to init ts variables


  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.startOrResumeTimer()
  }

  startOrResumeTimer() {
    const durationSeconds = this.trainingService.getRunningExercise().durationSeconds;
    if (durationSeconds) {
      const step = durationSeconds / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress += 1;
        if(this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }
      }, step);
    }
  }

  onStop() {
    clearInterval(this.timer);

    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? this.trainingService.cancelExercise(this.progress) : this.startOrResumeTimer()
    });

  }
  
}
