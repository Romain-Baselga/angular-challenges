import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivateFn } from '@angular/router';
import { DialogConfirmationComponent } from './dialog-confirmation.component';
import { DialogSensitiveComponent } from './dialog-sensitive.component';
import { DialogSimpleComponent } from './dialog-simple.component';

export const noDialogOpenGuard: CanDeactivateFn<unknown> = (
  _component,
  _currentRoute,
  _currentState,
  _nextState,
) => {
  const matDialog = inject(MatDialog);

  if (matDialog.openDialogs.length === 0) {
    return true;
  }

  const thereIsAConfirmationDialog = matDialog.openDialogs.some(
    (dialog) => dialog.componentInstance instanceof DialogConfirmationComponent,
  );

  matDialog.openDialogs.forEach((dialog) => {
    if (
      dialog.componentInstance instanceof DialogSimpleComponent ||
      dialog.componentInstance instanceof DialogConfirmationComponent
    ) {
      dialog.close();
    } else if (
      dialog.componentInstance instanceof DialogSensitiveComponent &&
      !thereIsAConfirmationDialog
    ) {
      matDialog.open(DialogConfirmationComponent);
    }
  });
  return false;
};
