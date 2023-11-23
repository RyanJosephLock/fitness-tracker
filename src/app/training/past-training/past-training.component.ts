import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, OnDestroy, AfterViewInit {
  // Set mat table columns and order
  displayedColumns = ['date', 'name', 'durationSeconds', 'calories', 'state']
  dataSource = new MatTableDataSource<Exercise>();
  private exerciseChangedSubscription?: Subscription;

  // Get access to the sort property of the mat mat table
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exerciseChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    });
    this.trainingService.fetchFinishedExercises();
  }

  ngAfterViewInit() {
    // Connect the angular table apis to the table data source
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource);
  }

  doFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
      // Angular will cocatonate a row together as a lowercase string, so the filter needs to be lower case
      this.dataSource.filter = inputValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.exerciseChangedSubscription?.unsubscribe();
  }

}
