/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextStaticComponent } from './static-text.component';

@Component({
  selector: 'page',
  standalone: true,
  imports: [TextStaticComponent],
  template: `
    <static-text></static-text>
    <static-text type="error"></static-text>
    <static-text type="warning"></static-text>

    <!-- This is a bad idea, a real project show not allow sutch customisation -->
    <!-- <text [font]="15" color="blue">This is a blue text</text> -->
  `,
})
export class PageComponent {}
