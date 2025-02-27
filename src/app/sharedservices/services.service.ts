import { inject, Injectable } from '@angular/core';
import { Observable }  from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }


private baseURL = 'http://localhost:3000';



//User Functions

createUser(user:{usertype:number,name:string, email:string,phNumber:string ,password:string,confirm_password:string,}): Observable<any> {
  return this.http.post<any>(`${this.baseURL}/auth/register`, user);
}

// getUsers():Observable<any> {
//   return this.http.get<any>(this.baseURL);
// }

// loginUser(email:string, password:string): Observable<any> {
//   return this.http.post<any>(`${this.baseURL}/auth/login`, {email, password});
// }


///Job Function
createJob(job:{authorID:string,companyName:string, jobAddress:string, jobPosition:string ,jobExperience:string, jobSalary:string, jobDescription:string}): Observable<any> {
  return this.http.post<any>(`${this.baseURL}/postjob`, job);
}

getJobs():Observable<any[]>{
  return this.http.get<any>(`${this.baseURL}/showjobs`);

}
deleteJob(id:string):Observable<any>{
  return this.http.delete<any>(`${this.baseURL}/deletejob/${id}`);
}

getJobById(id: string): Observable<any> {
  return this.http.get<any>(`${this.baseURL}/viewjob/${id}`);
}
updateJobId(id: string, job: any): Observable<any> {
  return this.http.put<any>(`${this.baseURL}/updatejob/${id}`, job);
}


//admin functions
getUsers():Observable<any[]>{
  return this.http.get<any>(`${this.baseURL}/showusers`);

}


}
