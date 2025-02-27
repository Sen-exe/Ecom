import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./authentication/login/login.component";
import { RegisterComponent } from './authentication/register/register.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { HomepageComponent } from './home/homepage/homepage.component';
import { MainComponent } from './main/main.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegisterComponent, NavbarComponent,HomepageComponent,MainComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nodeFrondEnd';
  
}
