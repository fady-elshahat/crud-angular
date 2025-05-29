import { inject, Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ICurrentUser, IUser, IUserRequest } from '../interfaces/auth/user';
import { Router } from '@angular/router';
import { AuthResponse } from '../interfaces/auth/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _Router = inject(Router);

  public isUserLoggedIn = signal(this.hasToken());
  public currentUser = signal<ICurrentUser | null>(null);

  constructor() {
    if (this.hasToken()) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser.set(JSON.parse(storedUser));
        this._Router.navigate(['/products']);
      }
    }
  }

  private getUsersLocalStorage(): IUser[] {
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsersToLocalStorage(users: IUser[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  register(userData: IUser): Observable<AuthResponse> {
    const users = this.getUsersLocalStorage();
    const userExists = users.some(u => u.email === userData.email);
    if (userExists) {
      return throwError(() => new Error('Email already registered.'));
    }

    users.push(userData);
    this.saveUsersToLocalStorage(users);
    return of({ success: true, message: 'Registration successful!' });
  }

  login(credentials: IUserRequest): Observable<AuthResponse> {
    const users = this.getUsersLocalStorage();
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

    if (user) {
      const fakeToken = 'fake_jwt_token_for_' + user.email;
      localStorage.setItem('authToken', fakeToken);
      localStorage.setItem('currentUser', JSON.stringify({ username: user.username, email: user.email }));

      this.isUserLoggedIn.set(true);
      this.currentUser.set({ username: user.username, email: user.email });
      this._Router.navigate(['/products']);

      return of({
        success: true,
        message: 'Login successful!',
        user: { username: user.username, email: user.email }
      });
    } else {
      return throwError(() => new Error('Login failed: Invalid email or password.'));
    }
  }

  logout(): Observable<{ success: boolean, message: string }> {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.isUserLoggedIn.set(false);
    this.currentUser.set(null);
    this._Router.navigate(['/login']);
    return of({ success: true, message: 'Logged out successfully.' });
  }

  hasToken(): boolean {
    const token = localStorage.getItem('authToken');
    return token !== null;
  }
}
