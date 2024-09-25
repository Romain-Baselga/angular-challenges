import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { interval, map, take, takeUntil, takeWhile } from 'rxjs';

@Component({
  selector: 'app-holder-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (mousedown)="launchTimers()"
      (mouseleave)="stopHolding$.emit()"
      (mouseup)="stopHolding$.emit()"
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

  stopHolding$ = new EventEmitter<void>();

  launchTimers() {
    this.stopHolding$.pipe(take(1)).subscribe(() => {
      this.actionProgress.emit(0);
    });

    interval(this.duration / 100)
      .pipe(
        map((number) => number + 1),
        takeWhile((number) => number <= 100),
        takeUntil(this.stopHolding$),
      )
      .subscribe((number) => {
        this.actionProgress.emit(number);
        if (number == 100) {
          this.actionValidated.emit();
        }
      });
  }
}
