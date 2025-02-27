import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ServicesService } from '../../sharedservices/services.service';
import { FormBuilder, FormGroup, Validators,FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Input, Output } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';


@Component({
  selector: 'app-viewjob',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, CommonModule,FormsModule,ReactiveFormsModule,NavbarComponent],
  templateUrl: './viewjob.component.html',
  styleUrl: './viewjob.component.css'
})
export class ViewjobComponent {
  jobId: any;
  updateForm!: FormGroup;

  @Input() jobdata: any = {
    companyName: '',
    jobAddress: '',
    jobPosition: '',
    jobExperience: '',
    jobSalary: '',
    jobDescription: ''
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: ServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id');
    if (this.jobId) {
      this.service.getJobById(this.jobId).subscribe(
        (data) => {
          this.jobdata = data;
          this.updateForm = this.fb.group({
            authorID: [this.jobdata.authorID],
            companyName: [this.jobdata.companyName, Validators.required],
            jobAddress: [this.jobdata.jobAddress],
            jobPosition: [this.jobdata.jobPosition],
            jobExperience: [this.jobdata.jobExperience],
            jobSalary: [this.jobdata.jobSalary],
            jobDescription: [this.jobdata.jobDescription]
          });
        },
        (error) => {
          console.error('Error fetching job:', error);
        }
      );
    }
  }

  updateJob() {
    const updatedData = { ...this.jobdata, ...this.updateForm.value }; // Merge originals data with form values
    this.service.updateJobId(this.jobId, updatedData).subscribe(
      (data) => {
        this.router.navigate(['/user/homepage']);
        alert('Job Updated Successfully');

      },
      (error) => {
        console.error(error);
      }
    );
  }

}
