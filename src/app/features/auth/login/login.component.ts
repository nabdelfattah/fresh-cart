import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ],
    ],
  });

  submitHandler() {
    if (this.loginForm.valid) {
      // send data to backend
      this.authService.signin(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            // save token and user data to local storage
            localStorage.setItem('freshToken', res.token);
            localStorage.setItem('freshUser', JSON.stringify(res.user));

            this.authService.isLogged.set(true);
            console.log({ isLogged: this.authService.isLogged() });

            // navigate to home page
            this.router.navigate(['/']);
          }
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
