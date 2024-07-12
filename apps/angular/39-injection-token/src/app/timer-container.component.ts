import { Component } from '@angular/core';
import { TimerComponent } from './timer.component';
import { TimerService } from './timer.service';
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
  constructor(private timerService: TimerService) {}
  timer = this.timerService.period;
}
