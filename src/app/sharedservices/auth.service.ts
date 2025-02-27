import { Injectable,inject } from '@angular/core';
import { Observable }  from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private router = inject(Router);
  user:any;
  usertype:any;
  usercheck = localStorage.getItem('user');

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {  // Check if response contains the token
          localStorage.setItem('token', response.token);
          localStorage.setItem('user',JSON.stringify(response.user));
          // this.usertype = localStorage.getItem('user');
          // this.usercheck = this.usertype;
          // console.log('get user Details to pass:', this.usertype);
          console.log('get user Details to pass:', this.usercheck);
          console.log('Token stored:', response.token);
          console.log('Logged IN user', response.user);
        } else {
          console.error('No token found in response:', response);
        }
      })


    );

  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token',);
  }

  // isAdmin(): boolean {
  //   // !!localStorage.getItem('user');
  // }



  checkUserType() {
    this.usertype =  this.usercheck ? JSON.parse(this.usercheck) : null;
    return this.usertype.usertype;
  }



  logout(): void {
    const confirmLogout = window.confirm('Are you sure you want to log out?');

    if (confirmLogout) {
      localStorage.removeItem('token');
        localStorage.removeItem('user');
      this.router.navigate(['/login']);
      alert("Logged out successfully");
    } else {
      console.log("Logout cancelled");
    }
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
