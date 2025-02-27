import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AddlistingComponent } from "../../forms/addlisting/addlisting.component";
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../sharedservices/services.service';
import { AuthService } from '../../sharedservices/auth.service';
import { DrawerComponent } from '../drawer/drawer.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ProfileComponent } from "../profile/profile.component";
import { ApplyformComponent } from '../../forms/applyform/applyform.component';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [AddlistingComponent, CommonModule, DrawerComponent, RouterLink, RouterLinkActive, NavbarComponent, ProfileComponent, ApplyformComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  isAddListingModalVisible:boolean = false;
  applyModalVisible:boolean = false;
  jobs :any=[];
  user:any;
  misc:boolean=false;


  constructor(private auth: AuthService,private service: ServicesService, private router: Router) {}
   ngOnInit(){
     this.loadJobs();
    const userdata = localStorage.getItem('user');
    this.user = userdata ? JSON.parse(userdata) : null;
    console.log(this.user.id);
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
  openApplyModal() {
    this.applyModalVisible = true;
  }
  closeApplyModal() {
    this.applyModalVisible = false;
  }
}
