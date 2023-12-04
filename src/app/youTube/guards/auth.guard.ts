import {inject} from '@angular/core';
import { Router } from '@angular/router';

import {LoginService} from '../../auth/services/login.service';

export const authGuard = () => {
  const authService = inject(LoginService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.parseUrl('/login');
};
