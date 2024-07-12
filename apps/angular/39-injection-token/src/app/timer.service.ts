import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private _timer$ = interval(1000);
  public get timer$() {
    return this._timer$;
  }

  private _period = 1000;
  public get period(): number {
    return this._period;
  }
  public set period(value: number) {
    this._period = value;
    this._timer$ = interval(value);
  }
}
