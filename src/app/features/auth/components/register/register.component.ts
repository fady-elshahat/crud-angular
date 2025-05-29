import { Component, inject, OnDestroy } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';


@Component({
  selector: 'app-register',
  imports: [CardComponent, ButtonComponent, InputFieldComponent, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

  public isLoading = false;
  public registerForm!: FormGroup;
  public subscription = new Subscription();

  private _Router = inject(Router)
  private _AuthService = inject(AuthService)
  private _Fb = inject(FormBuilder)
  private _ToastService = inject(ToastService);


  constructor() {
    this.initRegisterForm()
  }

  initRegisterForm() {
    this.registerForm = this._Fb.group(
      {
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      })
  }

  onRegister() {
    this.isLoading = !this.isLoading
    if (!this.registerForm.valid) {
      return
    }
    this.subscription.add(
      this._AuthService.register(this.registerForm.value).subscribe({
        next: (resp) => {
          this._ToastService.showSuccess(resp.message)
        },
        error: (err) => this._ToastService.showError(err.message),
        complete: () => {
          this.isLoading = false;
          this._Router.navigate(['/login'])

        }
      })
    )

  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
