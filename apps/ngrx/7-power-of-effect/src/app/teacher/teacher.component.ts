/* eslint-disable @angular-eslint/component-selector */
import { PushService } from '@angular-challenges/power-of-effect/backend';
import { Push, isStudent } from '@angular-challenges/power-of-effect/model';
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { studentActions } from '../student/store/student.actions';
import { TeacherSelectors } from './store/teacher.selectors';

@Component({
  standalone: true,
  imports: [NgFor, AsyncPipe],
  selector: 'teacher',
  template: `
    <h3>TEACHERS</h3>
    <div *ngFor="let teacher of teacher$ | async">
      {{ teacher.firstname }} {{ teacher.lastname }} - {{ teacher.version }}
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
export class TeacherComponent implements OnInit {
  teacher$ = this.store.select(TeacherSelectors.selectTeachers);

  constructor(
    private store: Store,
    private pushService: PushService,
  ) {}

  ngOnInit(): void {
    this.pushService.notification$
      .pipe(filter(Boolean))
      .subscribe((notification: Push) => {
        if (isStudent(notification)) {
          this.store.dispatch(
            studentActions.addOneStudent({ student: notification }),
          );
        }
      });
  }
}
