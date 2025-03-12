import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-auth-layouts',
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './auth-layouts.component.html',
  styleUrl: './auth-layouts.component.scss'
})
export class AuthLayoutsComponent {

}
