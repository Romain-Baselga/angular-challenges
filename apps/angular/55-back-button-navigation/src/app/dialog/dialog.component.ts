import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog-dialog',
  templateUrl: './dialog.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private dialogService: DialogService,
  ) {
    firstValueFrom(this.dialogService.dialogShouldBeClose).then(() => {
      this.dialogRef.close();
    });

    firstValueFrom(this.dialogRef.afterOpened()).then(() => {
      this.dialogService.isDialogOpen = true;
    });

    firstValueFrom(this.dialogRef.afterClosed()).then(() => {
      this.dialogService.isDialogOpen = false;
    });
  }
}
