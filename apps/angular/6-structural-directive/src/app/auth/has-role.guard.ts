import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

export const hasRoleGuard: CanMatchFn = (route, _state) => {
  return firstValueFrom(inject(UserStore).user$).then((user) => {
    const roleNeeded: Role | undefined = route?.data?.['role'];

    if (!roleNeeded) {
      console.error('missing role in data');
      return false;
    } else {
      return user?.roles.includes(roleNeeded) ?? false;
    }
  });
};
