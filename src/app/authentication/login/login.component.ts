import { AuthService } from './../../sharedservices/auth.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators,FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../sharedservices/services.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @Input() login: any = { email: '',password: '' };

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loginForm !: FormGroup;
  constructor(private authenticate:AuthService ,private service : ServicesService, private router: Router, private route: ActivatedRoute, private fb:FormBuilder) {}

  ngonit(){
  }


  onLogin() {
    this.authenticate.login(this.email, this.password).subscribe({
      next: (response: any) => {
        // Assuming `usertype` is returned in the response
        const usertype = response.user.usertype;

        if (usertype === 0) {
          this.router.navigate(['user/homepage']);
        } else if (usertype === 1) {
          this.router.navigate(['admin/dashboard']);
        } else {
          this.errorMessage = 'Unknown user type.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    });

    console.log(this.email, this.password + "Hello");
  }



}
