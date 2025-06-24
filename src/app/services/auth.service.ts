import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  // تسجيل المستخدم
  register(userData: any) {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  // تسجيل الدخول
  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // ✅ حفظ بيانات المستخدم والتوكن
  setUserData(user: any, token: string): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  // ✅ الحصول على بيانات المستخدم
  getUserData(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // ✅ الحصول على التوكن
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ التحقق من تسجيل الدخول
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // ✅ تسجيل الخروج
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
