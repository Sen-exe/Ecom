import { Component } from '@angular/core';
import { AuthService } from '../../sharedservices/auth.service';
import { ServicesService } from '../../sharedservices/services.service';
import { Router,RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent {

  user:any;

  constructor(private auth: AuthService,private service: ServicesService, private router: Router) {}

  

ngOnInit(): void {
  const userdata = localStorage.getItem('user');
  this.user = userdata ? JSON.parse(userdata) : null;

}

hidePhoneNumber(phNumber: string | number): string {
  const numberString = phNumber.toString(); 
  return numberString.slice(-3).padStart(numberString.length, '*');
}


  onLogout(): void {
    this.auth.logout()
  }
}
