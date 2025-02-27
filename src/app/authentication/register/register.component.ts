import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators,FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ServicesService } from '../../sharedservices/services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent     {

  @Input() register: any = {usertype:'usertype',name: '', email: '',phNumber:'',password: '', confirm_password: '' };
  alertMessage: string = '';
  usertype: number= 0;
  
  registerForm !: FormGroup;
  users:any[]=[];
  


  constructor(private service : ServicesService, private router: Router, private route: ActivatedRoute, private fb:FormBuilder) {

  }


ngOnInit() {
  this.registerForm = this.fb.group({
    usertype:[this.register.usertype,[Validators.required]],
    name: [this.register.name, [Validators.required,]],
    email: [this.register.email, [Validators.required, Validators.email,Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
    phNumber:[this.register.phNumber, [Validators.required, Validators.pattern('^[0-9]{11}$')]],
    password:[this.register.password, [Validators.required, Validators.minLength(8)]],
    confirm_password:[this.register.confirm_password,Validators.required]},{ validator: this.passwordMatchValidator });

}

passwordMatchValidator(formGroup: FormGroup): null | object {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirm_password')?.value;

  return password === confirmPassword ? null : { mismatch: true };
}



getUsers() {
  this.service.getUsers().subscribe((res) => {
    this.users = res;
  })


}


saveUser() {
  if (this.registerForm.valid) {
    this.register={
    usertype:this.usertype,
    name:this.registerForm.value.name,
    email:this.registerForm.value.email,
    phNumber:this.registerForm.value.phNumber,
    password:this.registerForm.value.password,
  }
  this.service.createUser(this.register).subscribe((err)=>{
    this.registerForm.reset();
    this.alertMessage = "User Registered Successfully"
    this.router.navigate(['/login']);
    alert("Account Created Successfully");
  },
  (error)=>{
  if(error.status==400){
    this.alertMessage = "User Already Exists"
    console.log("Existing");
    alert("User email Exists")
  }
  else{
    this.alertMessage = "Something went wrong"
  }
}
)

}
}

}
