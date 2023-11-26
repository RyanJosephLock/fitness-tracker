import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Exercise } from './exercise.model';


@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise | null>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = [];
    private runningExercise!: Exercise | null;
    private fbSubs: Subscription[] = [];

    constructor(private db: AngularFirestore) {}

    fetchAvailableExercises() {
        this.fbSubs.push(this.db
            .collection('availableExercises')
            .snapshotChanges()
            .pipe(
                map((docArray: any) => {
                    return docArray.map((doc: any) => {
                        const data = doc.payload.doc.data() as Exercise;
                        return {
                            id: doc.payload.doc.id,
                            name: data.name,
                            durationSeconds: data.durationSeconds,
                            calories: data.calories
                        } as Exercise;
                    });
                })
            )
            .subscribe((exercises: Exercise[]) => {
                this.availableExercises = exercises;
                this.exercisesChanged.next([...this.availableExercises]) // Create a new subject to emit changed exercises
            }, error => {
                // console.log(error);
            }));
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    startExercise(selectedId: string) {
        // Record start datetime into firestore
        this.db.doc('availableExercises/' + selectedId).update({lastSelectedDate: new Date()})
        // Start exercise
        const selectedExercise = this.availableExercises.find(ex => ex.id === selectedId);
        if(selectedExercise) {
            this.runningExercise = selectedExercise;
        }
        // Emit the new runningExercise object in the Subject observable. Use spread operator to not send actual, mutable exercise object
        if (this.runningExercise) {
            this.exerciseChanged.next({ ...this.runningExercise });
        }
    }

    completeExercise() {
        // Push completed exercise into array
        if(this.runningExercise) {
                this.addDataToDatabase({
                ...this.runningExercise,
                date: new Date(), 
                state: "completed"
            });
        }
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        // Push completed exercise into array, and override durationSeconds and calories
        if(this.runningExercise) {
            this.addDataToDatabase({
                ...this.runningExercise, 
                durationSeconds: this.runningExercise.durationSeconds = (progress / 100),
                calories: this.runningExercise.calories = (progress / 100),
                date: new Date(), 
                state: "cancelled"
            });
        }
        this.runningExercise = null;
        this.exerciseChanged.next(null);  
    }

    getRunningExercise() {
        // use spread operator to make a copy of the object, don't pass the actual mutable object
        return { ...this.runningExercise };
    }

    fetchFinishedExercises() {
        // Detect if an exercise is submitted to Firestore db. If so, update table with finishedExercisesChanged subscription.
        this.fbSubs.push(this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises) => {
            this.finishedExercisesChanged.next(exercises as Exercise[]);
        }, error => {
            // console.log(error);
        }));
        
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}