import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises!: Exercise[] | null; 
  exerciseSubscription?: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    // Subscribe to firestore exercise changes
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises
      }
    );
    // Fetch initial firestore exercises
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    // Pass exercise id selected in form to startExercise method, which fires exerciseChanged subject
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    // Unsubscribe on component destroy
    if(this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

}
