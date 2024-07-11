import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomNgForDirective } from './customNgForEmpty.directive';

@Component({
  standalone: true,
  imports: [CustomNgForDirective],
  selector: 'app-root',
  template: `
    <div>
      <button (click)="addNumber()">add</button>
      <button (click)="removeNumber()">remove</button>
    </div>

    <div *ngFor="let number of numbers; empty: emptyList">
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
