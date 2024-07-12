import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { DialogService } from './dialog.service';

export const noDialogOpenGuard: CanDeactivateFn<unknown> = (
  _component,
  _currentRoute,
  _currentState,
  _nextState,
) => {
  const dialogService = inject(DialogService);
  return !dialogService.isDialogOpen;
};
