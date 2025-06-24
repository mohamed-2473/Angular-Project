import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
// Adjust the import path according to your project structure.
// For example, if your login.component.ts is in 'components/login' and your service is in 'app/services':
// Update the path below to the correct relative path where auth.service.ts actually exists.
// For example, if AuthService is in 'src/app/services/auth.service.ts', use the following:
// Update the path below to the correct relative path where auth.service.ts actually exists.
// For example, if AuthService is in 'src/app/services/auth.service.ts', use the following:
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      alert('Please fill out all fields correctly.');
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('Login successful!', res);

        // ✅ حفظ بيانات المستخدم والتوكن في localStorage
        this.authService.setUserData(res.user, res.token);

        // ✅ التوجيه إلى الصفحة الرئيسية
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Invalid email or password.');
      }
    });
  }
}
