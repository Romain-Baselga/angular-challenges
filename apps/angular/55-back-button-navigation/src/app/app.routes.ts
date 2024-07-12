import { Routes } from '@angular/router';
import { DIALOG_TYPE, noDialogOpenGuard } from './dialog/no-dialog-open.guard';
import { HomeComponent } from './home/home.component';
import { SensitiveActionComponent } from './sensitive-action/sensitive-action.component';
import { SimpleActionComponent } from './simple-action/simple-action.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'simple-action',
    component: SimpleActionComponent,
    canDeactivate: [noDialogOpenGuard],
    data: {
      noDialogOpenGuardDialogType: DIALOG_TYPE.simple,
    },
  },
  {
    path: 'sensitive-action',
    component: SensitiveActionComponent,
    canDeactivate: [noDialogOpenGuard],
    data: {
      noDialogOpenGuardDialogType: DIALOG_TYPE.sensitive,
    },
  },
];
