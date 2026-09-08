import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  const platformId = inject(PLATFORM_ID);

  return next(req).pipe(
    catchError((err) => {
      if (isPlatformBrowser(platformId)) {
        toastrService.error(err.error.message, 'FreshCart', {
          progressBar: true,
          closeButton: true,
          timeOut: 6000,
        });
      }
      return throwError(() => err);
    }),
  );
};
