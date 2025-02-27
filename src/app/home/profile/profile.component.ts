import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Router } from '@angular/router';
import { AuthService } from '../../sharedservices/auth.service';
import { ServicesService } from '../../sharedservices/services.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


  user:any;

  constructor(private auth: AuthService,private service: ServicesService, private router: Router) {}



  ngOnInit(): void {
    const userdata = localStorage.getItem('user');
    this.user = userdata ? JSON.parse(userdata) : null;
  }
}
