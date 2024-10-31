/* eslint-disable @angular-eslint/component-selector */
import { PushService } from '@angular-challenges/power-of-effect/backend';
import { Push, isTeacher } from '@angular-challenges/power-of-effect/model';
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { teacherActions } from '../teacher/store/teacher.actions';
import { StudentSelectors } from './store/student.selectors';

@Component({
  standalone: true,
  imports: [NgFor, AsyncPipe],
  selector: 'student',
  template: `
    <h3>STUDENTS</h3>
    <div *ngFor="let student of students$ | async">
      {{ student.firstname }} {{ student.lastname }} - {{ student.version }}
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: fit-content;
        height: fit-content;
        border: 1px solid red;
        padding: 4px;
      }
    `,
  ],
})
export class StudentComponent implements OnInit {
  students$ = this.store.select(StudentSelectors.selectStudents);

  constructor(
    private store: Store,
    private pushService: PushService,
  ) {}

  ngOnInit(): void {
    this.pushService.notification$
      .pipe(filter(Boolean))
      .subscribe((notification: Push) => {
        if (isTeacher(notification)) {
          this.store.dispatch(
            teacherActions.addOneTeacher({ teacher: notification }),
          );
        }
      });
  }
}
