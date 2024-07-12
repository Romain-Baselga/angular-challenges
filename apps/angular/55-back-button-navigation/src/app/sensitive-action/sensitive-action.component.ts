import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogSensitiveComponent } from '../dialog/dialog-sensitive.component';

@Component({
  standalone: true,
  imports: [MatButtonModule],
  selector: 'app-sensitive-action',
  templateUrl: './sensitive-action.component.html',
})
export class SensitiveActionComponent {
  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(DialogSensitiveComponent, {
      width: '250px',
    });
  }
}
