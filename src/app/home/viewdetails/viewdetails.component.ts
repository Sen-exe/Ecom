import { Component,} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ServicesService } from '../../sharedservices/services.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-viewdetails',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,NavbarComponent],
  templateUrl: './viewdetails.component.html',
  styleUrl: './viewdetails.component.css'
})
export class ViewdetailsComponent {
  jobId: any;
  viewjob: any;
  user:any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: ServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id');
    
    const userdata = localStorage.getItem('user');
    this.user = userdata ? JSON.parse(userdata) : null;


    if (this.jobId) {
      this.service.getJobById(this.jobId).subscribe(
        (data) => {
          this.viewjob= data;
        },
        (error) => {
          console.error('Error fetching job:', error);
        }
      );
    }
  }
}
