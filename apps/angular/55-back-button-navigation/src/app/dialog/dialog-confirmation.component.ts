import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  template: `
    <h2 mat-dialog-title>You want to quit ?</h2>
    <mat-dialog-content>
      Are you sure you want to quit this page and lost work ?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Yes</button>
      <button mat-button mat-dialog-close cdkFocusInitial>No</button>
    </mat-dialog-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogConfirmationComponent {}
