import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogSimpleComponent } from '../dialog/dialog-simple.component';

@Component({
  standalone: true,
  imports: [MatButtonModule],
  selector: 'app-simple-action',
  templateUrl: './simple-action.component.html',
})
export class SimpleActionComponent {
  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(DialogSimpleComponent, {
      width: '250px',
    });
  }
}
