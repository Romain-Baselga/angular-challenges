import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  Input,
  TemplateRef,
} from '@angular/core';

interface PersonContext {
  name: string;
  age: number;
}

@Directive({ standalone: true, selector: '[personTemplate]' })
export class PersonTemplateDirective {
  @Input({ required: true }) personTemplate!: Person;

  static ngTemplateContextGuard(
    dir: PersonTemplateDirective,
    ctx: any,
  ): ctx is PersonContext {
    return true;
  }
}

interface Person {
  name: string;
  age: number;
}

@Component({
  standalone: true,
  imports: [NgTemplateOutlet],
  selector: 'person',
  template: `
    <ng-container
      *ngTemplateOutlet="
        personTemplateRef || emptyRef;
        context: { name: person.name, age: person.age }
      "></ng-container>

    <ng-template #emptyRef>No Template</ng-template>
  `,
})
export class PersonComponent {
  @Input() person!: Person;

  @ContentChild(PersonTemplateDirective, { read: TemplateRef })
  personTemplateRef!: TemplateRef<PersonContext>;
}
