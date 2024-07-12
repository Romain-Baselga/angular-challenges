import { Component } from '@angular/core';
import { TimerContainerComponent } from './timer-container.component';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [TimerContainerComponent],
  template: `
    <div class="flex gap-2">
      Phone Call Timer:
      <p class="italic">(should be 2000s)</p>
    </div>
    <timer-container />
  `,
})
export default class PhoneComponent {
  constructor(private timerService: TimerService) {
    this.timerService.period = 2000;
  }
}
