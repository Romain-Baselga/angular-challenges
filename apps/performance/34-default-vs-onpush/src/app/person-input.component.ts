import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-person-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,

    MatInputModule,
    CDFlashingDirective,
  ],
  template: `
    <mat-form-field class="w-4/5" cd-flash>
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [(ngModel)]="label"
        (keydown)="handleKey($event)" />
    </mat-form-field>
  `,
  styles: ``,
  host: {
    class: 'w-full flex flex-col items-center',
  },
})
export class PersonInputComponent {
  @Output() addName = new EventEmitter<string>();

  label = '';

  handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addName.emit(this.label);
      this.label = '';
    }
  }
}
