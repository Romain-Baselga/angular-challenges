import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TimerService } from './timer.service';

@Component({
  selector: 'timer',
  standalone: true,
  template: `
    Timer running {{ timer() }}
  `,
})
export class TimerComponent {
  constructor(private timerService: TimerService) {}

  timer = toSignal(this.timerService.timer$);
}
