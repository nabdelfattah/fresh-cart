import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
  imports: [RouterLink, NgClass, ReactiveFormsModule],
  selector: 'app-forget',
  templateUrl: './forget.component.html',
})
export class ForgetComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  step = signal(1);

  email = new FormControl('', [Validators.required]);
  code = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  submitEmailHandler(event: Event) {
    event.preventDefault();
    if (this.email.valid) {
      // send data to backend
      this.authService.forgetPassword({ email: this.email.value }).subscribe({
        next: (res) => {
          console.log(res);
          this.step.set(2);
        },
      });
    }
  }

  submitCodeHandler(event: Event) {
    event.preventDefault();
    if (this.code.valid) {
      // send data to backend
      this.authService.verifyEmail({ code: this.code.value }).subscribe({
        next: (res) => {
          console.log(res);
          this.step.set(3);
        },
      });
    }
  }

  submitPasswordHandler(event: Event) {
    event.preventDefault();
    if (this.password.valid) {
      // send data to backend
      const data = {
        email: this.email.value,
        newPassword: this.password.value,
      };
      this.authService.resetPassword(data).subscribe({
        next: (res) => {
          console.log(res);
          this.step.set(1);
          // navigate
          this.router.navigate(['/login']);
        },
      });
    }
  }

  resendCodeHandler() {
    this.authService.forgetPassword({ email: this.email.value }).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
