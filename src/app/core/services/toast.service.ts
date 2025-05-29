import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }
  private _MessageService = inject(MessageService);


  showSuccess(summary: string, detail?: string) {
    this._MessageService.add({ severity: 'success', summary, detail });
  }

  showError(summary: string, detail?: string) {
    this._MessageService.add({ severity: 'error', summary, detail });
  }

  showInfo(summary: string, detail?: string) {
    this._MessageService.add({ severity: 'info', summary, detail });
  }

  showWarn(summary: string, detail?: string) {
    this._MessageService.add({ severity: 'warn', summary, detail });
  }
}
