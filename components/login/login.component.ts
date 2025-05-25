import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],  // <-- هنا تضيف ReactiveFormsModule
  styleUrls: ['./login.component.css'],})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private router: Router) {
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

    const { email, password } = this.loginForm.value;

    // تحقق من المستخدم (مثلاً باستخدام localStorage أو خدمة)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      alert('Login successful!');
      this.router.navigate(['/home']); // توجيه لصفحة المنتجات بعد تسجيل الدخول
    } else {
      alert('Invalid email or password.');
    }
  }
}
