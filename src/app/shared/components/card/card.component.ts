import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CardComponent {
  @Input() title?: string;

  @ContentChild('body', { read: TemplateRef }) bodyTemplate?: TemplateRef<any>;
  @ContentChild('footer', { read: TemplateRef }) footerTemplate?: TemplateRef<any>;
}
