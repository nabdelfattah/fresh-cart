import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Service()
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  signUp(data: object): Observable<any> {
    return this.httpClient.post<any>(environment.baseUrl + '/auth/signup', data);
  }

  signin(data: object): Observable<any> {
    return this.httpClient.post<any>(environment.baseUrl + '/auth/signin', data);
  }

  forgetPassword(data: object): Observable<any> {
    return this.httpClient.post<any>(environment.baseUrl + '/auth/forgotPasswords', data);
  }
  verifyEmail(data: object): Observable<any> {
    return this.httpClient.post<any>(environment.baseUrl + '/auth/verifyResetCode', data);
  }
  resetPassword(data: object): Observable<any> {
    return this.httpClient.put<any>(environment.baseUrl + '/auth/resetPassword', data);
  }

  logout() {
    localStorage.removeItem('freshToken');
    localStorage.removeItem('freshUser');
    this.router.navigate(['/login']);
  }
}
