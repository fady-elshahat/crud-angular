import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ContentChild,
  Optional, Self,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
  NgControl
} from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

  styleUrls: ['./input-field.component.scss'],
  providers: [
  ]
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() type = 'text';
  @Input() helpText?: string;
  @Input() disabled = false;
  @Input() inputId = `input-${Math.random().toString(36).substring(2, 9)}`;
  @Input() fieldName?: string;

  value = '';

  @Output() valueChange = new EventEmitter<string>();

  @ContentChild('input', { read: TemplateRef, static: false }) inputTemplate?: TemplateRef<any> | null;

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  // ControlValueAccessor Methods
  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
