import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-blank-layouts',
  imports: [RouterOutlet, NavBarComponent, FooterComponent,],
  templateUrl: './blank-layouts.component.html',
  styleUrl: './blank-layouts.component.scss'
})
export class BlankLayoutsComponent {

}
