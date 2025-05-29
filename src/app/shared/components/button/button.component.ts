import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() btnClass = 'btn-primary';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon?: string;
  @Input() type?: string;


  @Output() clicked = new EventEmitter<Event>();
}
