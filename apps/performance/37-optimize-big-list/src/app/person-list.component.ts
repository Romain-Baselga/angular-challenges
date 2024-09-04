import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport
      itemSize="50"
      class="h-[300px] border-2 border-black">
      >
      <div
        *cdkVirtualFor="let person of persons"
        class="flex h-9 items-center justify-between border-b">
        <h3>{{ person.name }}</h3>
        <p>{{ person.email }}</p>
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  host: {
    class: 'w-full flex flex-col',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  @Input() persons: Person[] = [];
}
