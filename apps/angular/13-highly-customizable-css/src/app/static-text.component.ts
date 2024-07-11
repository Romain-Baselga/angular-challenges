/* eslint-disable @angular-eslint/component-selector */
import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

export type StaticTextType = 'normal' | 'warning' | 'error';

@Component({
  selector: 'static-text',
  standalone: true,
  imports: [NgClass],
  template: `
    <p [ngClass]="type">This is a static text</p>
  `,
  styles: `
    .normal {
      font: 10;
      color: black;
    }

    .error {
      font: 30;
      color: red;
    }

    .warning {
      font: 25;
      color: orange;
    }
  `,
})
export class TextStaticComponent {
  @Input() type!: StaticTextType;
}
