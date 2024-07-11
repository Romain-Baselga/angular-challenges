import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForEmptyDirective } from './ngForEmpty.directive';

@Component({
  standalone: true,
  imports: [NgForEmptyDirective],
  selector: 'app-root',
  template: `
    <div>
      <button (click)="addNumber()">add</button>
      <button (click)="removeNumber()">remove</button>
    </div>

    <div *appNgForEmpty="let number of numbers; empty: emptyList">
      the numberis: {{ number }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  numbers: number[] = [];

  addNumber(): void {
    this.numbers.push(Math.ceil(Math.random() * 1000));
  }

  removeNumber() {
    this.numbers.pop();
  }
}
