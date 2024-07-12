import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { DialogService } from './dialog.service';

export enum DIALOG_TYPE {
  'simple',
  'sensitive',
}

export const noDialogOpenGuard: CanDeactivateFn<unknown> = (
  _component,
  currentRoute,
  _currentState,
  _nextState,
) => {
  const dialogType: DIALOG_TYPE =
    currentRoute.data?.['noDialogOpenGuardDialogType'];

  const dialogService = inject(DialogService);

  if (dialogType === DIALOG_TYPE.simple) {
    if (dialogService.isDialogOpen) {
      dialogService.dialogShouldBeClose.emit();
      return false;
    } else {
      return true;
    }
  }

  if (dialogType === DIALOG_TYPE.sensitive) {
    if (dialogService.isDialogOpen) {
      return false;
    } else {
      dialogService.dialogShouldBeOpen.emit();
      return false;
    }
  }
  return true;
};
