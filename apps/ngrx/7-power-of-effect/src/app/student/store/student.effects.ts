import { PushService } from '@angular-challenges/power-of-effect/backend';
import { isStudent, Student } from '@angular-challenges/power-of-effect/model';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap } from 'rxjs';
import { appActions } from '../../app.actions';
import { HttpService } from '../../data-access/http.service';
import { studentActions } from './student.actions';

@Injectable()
export class StudentEffects {
  private actions$ = inject(Actions);
  private notification$ = inject(PushService).notification$;
  private httpService = inject(HttpService);

  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.initApp),
      switchMap(() =>
        this.httpService
          .getAllStudents()
          .pipe(map((students) => studentActions.addAllStudents({ students }))),
      ),
    ),
  );

  addStudents$ = createEffect(() =>
    this.notification$.pipe(
      filter(Boolean),
      filter((notif) => isStudent(notif)),
      map((student) =>
        studentActions.addOneStudent({ student: student as Student }),
      ),
    ),
  );
}
