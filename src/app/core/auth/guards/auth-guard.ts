import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // order, checkout, withlist, cart

  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('freshToken')) {
      return true;
    } else {
      // navigate to login or to home
      return router.parseUrl('/login');
    }
  } else {
    return true; // false cause error in the server because the false stop the routing
  }
};
