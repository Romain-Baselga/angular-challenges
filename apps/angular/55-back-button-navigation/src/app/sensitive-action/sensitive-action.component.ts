import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogService } from '../dialog/dialog.service';

@Component({
  standalone: true,
  imports: [MatButtonModule],
  selector: 'app-sensitive-action',
  templateUrl: './sensitive-action.component.html',
})
export class SensitiveActionComponent {
  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
  ) {
    // TODO unsubcribe
    this.dialogService.dialogShouldBeOpen.subscribe(() => {
      this.openDialog();
    });
  }

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      closeOnNavigation: false,
    });
  }
}
