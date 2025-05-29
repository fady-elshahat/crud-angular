import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';


@Component({
  selector: 'app-system-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent , SidebarComponent],
  templateUrl: './system-layout.component.html',
  styleUrl: './system-layout.component.scss'
})
export class SystemLayoutComponent {

}
