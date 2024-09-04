import { ChangeDetectionStrategy, Component } from '@angular/core';
import { randFirstName } from '@ngneat/falso';
import { PersonComponent } from './person.component';
import { RandomComponent } from './random.component';

@Component({
  standalone: true,
  imports: [RandomComponent, PersonComponent],
  selector: 'app-root',
  template: `
    <app-random />

    <div class="flex">
      <app-person [names]="girlList" title="Female" />
      <app-person [names]="boyList" title="Male" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  girlList = randFirstName({ gender: 'female', length: 10 });
  boyList = randFirstName({ gender: 'male', length: 10 });
}
