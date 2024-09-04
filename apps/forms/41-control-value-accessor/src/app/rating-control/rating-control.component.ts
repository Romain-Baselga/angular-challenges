import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingControlComponent),
      multi: true,
    },
  ],
  selector: 'app-rating-control',
  templateUrl: 'rating-control.component.html',
  styleUrls: ['rating-control.component.scss'],
})
export class RatingControlComponent implements ControlValueAccessor {
  currentRating = 0;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onChange: (_: number) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onTouch: (_: number) => void = () => {};

  setRating(rating: number): void {
    this.currentRating = rating;
    this._onChange(rating);
    this._onTouch(rating);
  }

  writeValue(value: number): void {
    this.currentRating = value;
  }
  registerOnChange(fn: (_: number) => void): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: (_: number) => void): void {
    this._onTouch = fn;
  }
}
