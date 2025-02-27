import { Component } from '@angular/core';
import { DrawerComponent } from '../home/drawer/drawer.component';
import { AddlistingComponent } from '../forms/addlisting/addlisting.component';
import { AuthService } from '../sharedservices/auth.service';
import { ServicesService } from '../sharedservices/services.service';
import { Router,RouterLink,RouterLinkActive,RouterOutlet } from '@angular/router';
import { HomepageComponent } from "../home/homepage/homepage.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,DrawerComponent, AddlistingComponent, HomepageComponent,HomepageComponent,RouterOutlet,CommonModule,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  isAddListingModalVisible:boolean = false;
  jobs :any=[];
  user:any;
  misc:boolean=false;


  constructor(private auth: AuthService,private service: ServicesService, private router: Router) {}
   ngOnInit(){
     this.loadJobs();
    const userdata = localStorage.getItem('user');
    this.user = userdata ? JSON.parse(userdata) : null;
    console.log(this.user.id + "navbar");
  }



   loadJobs(){
    this.service.getJobs().subscribe((data:any)=>{
      this.jobs = data;
    })
   }

   deleteJob(id:string){
    console.log(id + " front end");
    this.service.deleteJob(id).subscribe((data:any)=>{
      this.loadJobs();
      this.router.navigate(['/homepage']);
    })
   }

   onLogout(): void {
    this.auth.logout()
  }

  openAddListingModal() {
    this.isAddListingModalVisible = true;
  }

  closeAddListingModal() {
    this.isAddListingModalVisible = false;
  }
}
