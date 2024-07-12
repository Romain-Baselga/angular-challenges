import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  isDialogOpen = false;

  readonly dialogShouldBeClose = new EventEmitter<void>();
  readonly dialogShouldBeOpen = new EventEmitter<void>();
}
