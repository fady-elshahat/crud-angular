import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNoLeadingZero]'
})
export class NoLeadingZeroDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input: HTMLInputElement | null = this.el.nativeElement.querySelector('input');
    if (!input) return;

    let value = input.value || '';

    value = value.replace(/^0+/, '');

    if (value === '') {
      value = '0';
    }

    input.value = value;
  }
}
