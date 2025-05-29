import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar',
  imports: [PanelMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: true,
})
export class SidebarComponent {

  items = [

    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      items: [{ label: 'Profile' }]
    }
  ];
}
