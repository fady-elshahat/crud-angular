import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  // Injecting PrimeNG's MessageService
  private _MessageService = inject(MessageService);

  // Show success toast
  showSuccess(summary: string, detail?: string) {
    this._MessageService.add({ severity: 'success', summary, detail });
  }

  // Show error toast
  showError(summary: string, detail?: string) {
    this._MessageService.add({ severity: 'error', summary, detail });
  }

  // Show warning toast
  showWarn(summary: string, detail?: string) {
    this._MessageService.add({ severity: 'warn', summary, detail });
  }
}
