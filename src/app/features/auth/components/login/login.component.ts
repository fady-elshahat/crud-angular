import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserRequest } from '../../../../core/interfaces/auth/user';

import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent, ButtonComponent, CardComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginData: IUserRequest = {
    email: '',
    password: ''
  };
  public subscription = new Subscription();
  public isLoading = false;

  private _Router = inject(Router)
  private _AuthService = inject(AuthService)
  private _ToastService = inject(ToastService);

  constructor() { }

  onLogin() {
    if (!this.loginData.email || !this.loginData.password) {

      this._ToastService.showWarn('Please fill in both email and password.')
      return;
    }

    this.isLoading = true;

    this._AuthService.login(this.loginData).subscribe({
      next: (resp) => {
        this._ToastService.showSuccess(resp.message)
      },
      error: err => {
        this._ToastService.showError(err.message)
      },
      complete: () => {
        this.isLoading = false;
        this._Router.navigate(['/products']);

      }
    });

  }
}
