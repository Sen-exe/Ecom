import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from '../../home/drawer/drawer.component';
import { AuthService } from '../../sharedservices/auth.service';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ServicesService } from '../../sharedservices/services.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterLink,RouterLinkActive,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


  users: any=[];
  currentuser:any;


  constructor(private auth: AuthService,private service: ServicesService, private router: Router) { }
  ngOnInit() {
    this.loadUsers();
    const userdata = localStorage.getItem('user');
    this.currentuser = userdata ? JSON.parse(userdata) : null;
  }


  loadUsers(){
    this.service.getUsers().subscribe((data:any)=>{
      this.users = data;
    })
   }
}
