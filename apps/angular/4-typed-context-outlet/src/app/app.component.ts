import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent, ListTemplateDirective } from './list.component';
import { PersonComponent, PersonTemplateDirective } from './person.component';

@Component({
  standalone: true,
  imports: [
    NgTemplateOutlet,
    PersonComponent,
    ListComponent,
    PersonTemplateDirective,
    ListTemplateDirective,
  ],
  selector: 'app-root',
  template: `
    <person [person]="person">
      <ng-container *personTemplate="person; name as name; age as age">
        {{ name }}: {{ age }}
      </ng-container>
    </person>

    <list [list]="students">
      <ng-container *templateDirective="students; item as student; index as i">
        {{ student.name }}: {{ student.age }} - {{ i }}
      </ng-container>
    </list>

    <list [list]="cities">
      <ng-container *templateDirective="cities; item as city; index as i">
        {{ city.name }}: {{ city.country }} - {{ i }}
      </ng-container>
    </list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  person = {
    name: 'toto',
    age: 3,
  };

  students = [
    { name: 'toto', age: 3 },
    { name: 'titi', age: 4 },
  ];

  cities = [
    { name: 'Paris', country: 'France' },
    { name: 'Berlin', country: 'Germany' },
  ];
}
