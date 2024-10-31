import { PushService } from '@angular-challenges/power-of-effect/backend';
import { isTeacher, Teacher } from '@angular-challenges/power-of-effect/model';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap } from 'rxjs';
import { appActions } from '../../app.actions';
import { HttpService } from '../../data-access/http.service';
import { teacherActions } from './teacher.actions';

@Injectable()
export class TeacherEffects {
  private actions$ = inject(Actions);
  private notification$ = inject(PushService).notification$;
  private httpService = inject(HttpService);

  loadTeachers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.initApp),
      switchMap(() =>
        this.httpService
          .getAllTeachers()
          .pipe(map((teachers) => teacherActions.addAllTeachers({ teachers }))),
      ),
    ),
  );

  addTeacher$ = createEffect(() =>
    this.notification$.pipe(
      filter(Boolean),
      filter((notif) => isTeacher(notif)),
      map((teacher) =>
        teacherActions.addOneTeacher({ teacher: teacher as Teacher }),
      ),
    ),
  );
}
