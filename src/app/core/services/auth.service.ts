import { inject, Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ICurrentUser, IUser, IUserRequest } from '../interfaces/auth/user';
import { Router } from '@angular/router';
import { AuthResponse } from '../interfaces/auth/auth-response';
import { IProduct } from '../interfaces/product/product';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _Router = inject(Router);

  // Signal to track login status
  public isUserLoggedIn = signal(this.hasToken());

  // Signal to store current user info
  public currentUser = signal<ICurrentUser | null>(null);

  constructor() {
    // If user has token, retrieve user from localStorage and redirect to products
    if (this.hasToken()) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser.set(JSON.parse(storedUser));
        this._Router.navigate(['/products']);
      }
    }
  }

  // Get all users from localStorage
  private getUsersLocalStorage(): IUser[] {
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : [];
  }

  // Save users array to localStorage
  private saveUsersToLocalStorage(users: IUser[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Register a new user
  register(userData: IUser): Observable<AuthResponse> {
    const users = this.getUsersLocalStorage();
    const userExists = users.some(u => u.email === userData.email);

    if (userExists) {
      return throwError(() => new Error('Email already registered.'));
    }

    const newUser: IUser = {
      ...userData,
      products: userData.products || []
    };

    users.push(newUser);
    this.saveUsersToLocalStorage(users);

    return of({ success: true, message: 'Registration successful!' });
  }

  // Login existing user
  login(credentials: IUserRequest): Observable<AuthResponse> {
    const users = this.getUsersLocalStorage();
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

    if (user) {
      const fakeToken = 'fake_jwt_token_for_' + user.email;
      localStorage.setItem('authToken', fakeToken);
      localStorage.setItem('currentUser', JSON.stringify({ username: user.username, email: user.email, products: user.products }));

      this.isUserLoggedIn.set(true);
      this.currentUser.set({ username: user.username, email: user.email });

      this._Router.navigate(['/products']);

      return of({
        success: true,
        message: 'Login successful!',
        user: { username: user.username, email: user.email, products: user.products }
      });
    } else {
      return throwError(() => new Error('Login failed: Invalid email or password.'));
    }
  }

  // Logout user
  logout(): Observable<{ success: boolean, message: string }> {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.isUserLoggedIn.set(false);
    this.currentUser.set(null);
    this._Router.navigate(['/login']);

    return of({ success: true, message: 'Logged out successfully.' });
  }

  // Check if token exists in localStorage
  hasToken(): boolean {
    const token = localStorage.getItem('authToken');
    return token !== null;
  }

  // Update user’s products list and save changes
  updateUserProducts(email: string, products: IProduct[]): void {
    const users = this.getUsersLocalStorage();
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex !== -1) {
      users[userIndex].products = products;
      this.saveUsersToLocalStorage(users);

      const currentUser = this.currentUser();
      if (currentUser?.email === email) {
        this.currentUser.set({ ...currentUser, products });
        localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, products }));
      }
    }
  }
}
