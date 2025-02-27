import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesService } from '../../sharedservices/services.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-addlisting',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './addlisting.component.html',
  styleUrl: './addlisting.component.css'
})
export class AddlistingComponent {

  @Input() job:any = {authorID:'',companyName:'',jobAddress:'',jobPosition:'',jobExperience:'',jobSalary:'',jobDescription:''};
  @Output() cancel = new EventEmitter<void>();
  jobs:any = [];
  authorID:any;
  postJobForm !:FormGroup;

constructor(private service : ServicesService, private fb:FormBuilder,private routes: ActivatedRoute, private router: Router) { }




ngOnInit() {
  const userdata = localStorage.getItem('user');
  this.authorID = userdata ? JSON.parse(userdata) : null;
  console.log(this.authorID.id + " this is inside NGONINIT");

  this.postJobForm = this.fb.group({
    authorID:[this.authorID.id,[Validators.required]],
    companyName:[this.job.companyName,[Validators.required]],
    jobAddress:[this.job.jobAddress,[Validators.required]],
    jobPosition:[this.job.jobPosition,[Validators.required]],
    jobExperience:[this.job.jobExperience,[Validators.required]],
    jobSalary:[this.job.jobSalary,[Validators.required]],
    jobDescription:[this.job.jobDescription,[Validators.required]],
  })


}

saveJob() {
    this.jobs={
      authorID:this.authorID.id,
      companyName:this.postJobForm.value.companyName ,
      jobAddress: this.postJobForm.value.jobAddress,
      jobPosition: this.postJobForm.value.jobPosition,
      jobExperience: this.postJobForm.value.jobExperience,
      jobSalary: this.postJobForm.value.jobSalary,
      jobDescription: this.postJobForm.value.jobDescription,
  }
  console.log(this.jobs);

  this.service.createJob(this.jobs).subscribe((err)=>{
    this.postJobForm.reset();
    alert("Job Posted Successfully");
    this.postJobForm.reset();
    this.router.navigate(['/homepage']);
  },
)

}


  onCancel() {
    this.cancel.emit();
    location.reload();
  }

}
