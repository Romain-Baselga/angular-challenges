import { Component } from '@angular/core';
import { TIMER_PERIOD } from './time-token';
import { TimerContainerComponent } from './timer-container.component';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [TimerContainerComponent],
  providers: [
    {
      provide: TIMER_PERIOD,
      useValue: 2000,
    },
  ],
  template: `
    <div class="flex gap-2">
      Phone Call Timer:
      <p class="italic">(should be 2000s)</p>
    </div>
    <timer-container />
  `,
})
export default class PhoneComponent {}
