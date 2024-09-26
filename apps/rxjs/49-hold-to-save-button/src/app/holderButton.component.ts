import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { HoldDirective } from './hold.directive';

@Component({
  selector: 'app-holder-button',
  standalone: true,
  imports: [CommonModule, HoldDirective],
  template: `
    <button
      [appHold]="duration"
      (appHoldActionValidated)="actionValidated.emit()"
      (appHoldActionProgress)="actionProgress.emit($event)"
      class="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors ease-in-out hover:bg-indigo-700">
      Hold me
    </button>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HolderButtonComponent {
  @Input({ required: true }) duration!: number;
  @Output() actionValidated = new EventEmitter<void>();
  @Output() actionProgress = new EventEmitter<number>();
}
