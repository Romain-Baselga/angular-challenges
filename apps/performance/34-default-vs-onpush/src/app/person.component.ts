import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PersonInputComponent } from './person-input.component';
import { PersonListComponent } from './person-list.component';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [
    CommonModule,
    PersonListComponent,
    PersonInputComponent,
    CDFlashingDirective,
  ],
  template: `
    <h1 cd-flash class="text-center font-semibold" title="Title">
      {{ title | titlecase }}
    </h1>

    <app-person-input (addName)="addName($event)"></app-person-input>
    <app-person-list [names]="names"></app-person-list>
  `,
  styles: ``,
  host: {
    class: 'w-full flex flex-col items-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent {
  @Input() title = '';
  @Input() names: string[] = [];

  addName(name: string): void {
    this.names = [name, ...this.names];
  }
}
