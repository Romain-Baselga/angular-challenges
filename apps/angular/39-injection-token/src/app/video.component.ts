import { Component } from '@angular/core';
import { TimerContainerComponent } from './timer-container.component';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [TimerContainerComponent],
  template: `
    <div class="flex gap-2">
      Video Call Timer:
      <p class="italic">(should be the default 1000s)</p>
    </div>
    <timer-container />
  `,
})
export default class VideoComponent {
  constructor(private timerService: TimerService) {
    this.timerService.period = 1000;
  }
}
