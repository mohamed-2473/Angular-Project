import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
// Update the path below to the correct relative path where auth.service.ts actually exists.
// For example, if it's in 'services' at the project root:
// Update the path below to the correct relative path where auth.service.ts actually exists.
// For example, if it's in 'src/app/services':
// Update the path below to the correct relative path where auth.service.ts actually exists.
// For example, if it's in the same folder as this component:
import { AuthService } from '../../services/auth.service';
// Or, if it's in a different folder, adjust the path accordingly.

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  showPassword = false;
  showConfirmPassword = false;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      alert('Please fill out all fields correctly.');
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        console.log('User registered!', res);

        // ✅ حفظ البيانات وتسجيل الدخول مباشرةً
        this.authService.setUserData(res.user, res.token);

        alert('Registration successful!');

        // ✅ التوجيه للصفحة الرئيسية
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        alert('Registration failed. Please try again.');
      }
    });
  }
}
