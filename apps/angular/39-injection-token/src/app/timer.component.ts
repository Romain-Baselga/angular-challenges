import { Component, Injector } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { TIMER_PERIOD } from './time-token';

@Component({
  selector: 'timer',
  standalone: true,
  template: `
    Timer running {{ timer() }}
  `,
})
export class TimerComponent {
  constructor(private injector: Injector) {}
  timer = toSignal(interval(this.injector.get(TIMER_PERIOD)));
}
