import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { fromEvent, interval, map, merge, takeUntil, takeWhile } from 'rxjs';

@Directive({
  selector: '[appHold]',
  standalone: true,
})
export class HoldDirective {
  @Input({ required: true, alias: 'appHold' }) duration!: number;
  @Output('appHoldActionValidated') actionValidated = new EventEmitter<void>();
  @Output('appHoldActionProgress') actionProgress = new EventEmitter<number>();

  constructor(private el: ElementRef) {
    const stopHolding$ = merge(
      fromEvent(el.nativeElement, 'mouseup'),
      fromEvent(el.nativeElement, 'mouseleave'),
    );

    fromEvent(el.nativeElement, 'mousedown').subscribe(() => {
      interval(this.duration / 100)
        .pipe(
          map((number) => number + 1),
          takeWhile((number) => number <= 100),
          takeUntil(stopHolding$),
        )
        .subscribe((number) => {
          this.actionProgress.emit(number);
          if (number == 100) {
            this.actionValidated.emit();
          }
        });
    });

    stopHolding$.subscribe(() => {
      this.actionProgress.emit(0);
    });
  }
}
