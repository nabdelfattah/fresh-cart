import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(NgxSpinnerService);
  spinnerService.show('main-spinner');

  return next(req).pipe(finalize(() => spinnerService.hide('main-spinner')));
};
