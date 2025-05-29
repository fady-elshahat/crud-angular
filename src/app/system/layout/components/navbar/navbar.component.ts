import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, ButtonComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  animations: [
    trigger('typingAnimation', [
      transition('* => *', [
        query('span', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(150, [
            animate(
              '200ms ease-out',
              style({ opacity: 1, transform: 'translateY(0)' })
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})

export class NavbarComponent implements OnInit, OnDestroy {


  public isLoading = false;
  public text = 'CRUD APP';
  public letters = this.text.split('');
  public animationState = 0;

  private _ToastService = inject(ToastService);
  private _AuthService = inject(AuthService)
  private _Subscription = new Subscription();



  ngOnInit() {
    this.runAnimationLoop();
  }

  runAnimationLoop() {
    this._Subscription.add(
      interval(this.letters.length * 550 + 400).subscribe(() => {
        this.animationState++;
      })
    )
  }

  onLogout() {
    this._Subscription.add(
      this._AuthService.logout().subscribe({
        next: (resp) => {
          this._ToastService.showSuccess(resp.message)
        },
        complete: () => {
          this.isLoading = false
        }
      })
    )
  }
  ngOnDestroy() {
    this._Subscription.unsubscribe();
  }
}

