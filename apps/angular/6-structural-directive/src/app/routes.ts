import { hasRoleGuard } from './auth/has-role.guard';

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [hasRoleGuard],
    data: {
      role: 'ADMIN',
    },
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [hasRoleGuard],
    data: {
      role: 'MANAGER',
    },
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/everyone.component').then(
        (m) => m.EveryoneDashboardComponent,
      ),
  },
];
