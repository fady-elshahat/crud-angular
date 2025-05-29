import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './system/layout/pages/auth-layout/auth-layout.component';
import { SystemLayoutComponent } from './system/layout/pages/system-layout/system-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { NotFoundComponent } from './system/layout/pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [noAuthGuard],
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/components/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./features/auth/components/register/register.component').then(m => m.RegisterComponent) },

    ]
  },
  {
    path: '',
    component: SystemLayoutComponent,
    canActivate: [authGuard],
    children: [

      {
        path: 'products', loadComponent: () => import('./features/products/product-list/product-list.component').then(m => m.ProductListComponent)
      }
    ]
  },

  { path: '**', component: NotFoundComponent },
];
