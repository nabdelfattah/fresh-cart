import { AbstractControl, ValidationErrors } from '@angular/forms';

export function matchPasswords(passwordKey: string, confirmPasswordKey: string) {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey)?.value;
    const rePassword = group.get(confirmPasswordKey)?.value;

    if (password !== rePassword && rePassword != '') {
      // set error to the repassword form control
      group.get(confirmPasswordKey)?.setErrors({ mismatch: true });
      // set error to the form itself
      return { mismatch: true };
    } else {
      return null;
    }
  };
}

// export function matchPassword(passwordKey: string, rePasswordKey: string) {
//   return (group: AbstractControl): ValidationErrors | null => {
//     const password = group.get(passwordKey)?.value;
//     const rePassword = group.get(rePasswordKey)?.value;
//     if (password === rePassword) {
//       return null;
//     } else {
//       return { passwordMismatch: true };
//     }
//   };
// }

// export function confirmPassword(
//   group: AbstractControl,
//   passwordKey: string,
//   rePasswordKey: string,
// ) {
//   const password = group.get(passwordKey)?.value;
//   const rePassword = group.get(rePasswordKey)?.value;
//   console.log('hi...');
//   if (password !== rePassword && rePassword != '') {
//     // set error to the repassword form control
//     group.get(rePasswordKey)?.setErrors({ mismatch: true });
//     // set error to the form itself
//     return { mismatch: true };
//   } else {
//     return null;
//   }
// }
