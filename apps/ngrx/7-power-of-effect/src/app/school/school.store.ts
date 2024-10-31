import { PushService } from '@angular-challenges/power-of-effect/backend';
import { isSchool, School } from '@angular-challenges/power-of-effect/model';
import { Injectable } from '@angular/core';
import {
  ComponentStore,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { filter, pipe, switchMap } from 'rxjs';
import { HttpService } from '../data-access/http.service';

@Injectable()
export class SchoolStore
  extends ComponentStore<{ schools: School[] }>
  implements OnStoreInit
{
  readonly schools$ = this.select((state) => state.schools);

  constructor(
    private httpService: HttpService,
    private pushService: PushService,
  ) {
    super({ schools: [] });
  }
  private notification$ = this.pushService.notification$;

  addSchool = this.updater((state, school: School) => ({
    ...state,
    schools: [...state.schools, school],
  }));

  updateSchool = this.updater((state, school: School) => ({
    ...state,
    schools: state.schools.map((t) => (t.id === school.id ? school : t)),
  }));

  private readonly loadSchools = this.effect<void>(
    pipe(
      switchMap(() =>
        this.httpService.getAllSchools().pipe(
          tapResponse(
            (schools) => this.patchState({ schools }),
            (_) => _, // not handling the error
          ),
        ),
      ),
    ),
  );

  private readonly addSchools = this.effect<void>(
    pipe(
      switchMap(() => {
        return this.notification$.pipe(
          filter(Boolean),
          tapResponse(
            (notif) => {
              if (isSchool(notif)) {
                this.addSchool(notif);
              }
            },
            (_) => _,
          ),
        );
      }),
    ),
  );

  ngrxOnStoreInit() {
    this.loadSchools();
  }
}
