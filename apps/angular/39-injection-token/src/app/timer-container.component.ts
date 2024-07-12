import { Component, Injector } from '@angular/core';
import { TIMER_PERIOD } from './time-token';
import { TimerComponent } from './timer.component';
@Component({
  selector: 'timer-container',
  standalone: true,
  imports: [TimerComponent],
  template: `
    <div class="flex gap-2">
      Timer container:
      <p class="italic">(timer is {{ timer }}s)</p>
    </div>
    <timer />
  `,
  host: {
    class: 'border rounded-md flex p-4 gap-10',
  },
})
export class TimerContainerComponent {
  constructor(private injector: Injector) {}
  timer = this.injector.get(TIMER_PERIOD);
}
