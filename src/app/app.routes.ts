import { LoginComponent } from './authentication/login/login.component';
import { Routes, CanDeactivate } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { authGuard} from './sharedservices/auth.guard';
import { ViewjobComponent } from './home/viewjob/viewjob.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './home/profile/profile.component';
import { ViewdetailsComponent } from './home/viewdetails/viewdetails.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

export const routes: Routes = [
  { path :'', redirectTo: '/login', pathMatch:'full',},
  { path :'login',component: LoginComponent,canActivate: [authGuard]},
  { path :'register',component: RegisterComponent},




    {path : 'admin',canActivate: [authGuard],children:[
      { path :'dashboard',component: DashboardComponent, },
      // { path :'viewuser/:id',component: ProfileComponent, },
      { path :'', redirectTo: 'dashboard', pathMatch:'full',},
    ]},

    {path : 'user',canActivate: [authGuard],children:[
      { path :'homepage',component: HomepageComponent, },
      // { path :'admin/dashboard',component: DashboardComponent, },
      { path :'profile',component: ProfileComponent, },
      { path :'viewjob/:id',component: ViewjobComponent},
      { path :'viewdetails/:id',component: ViewdetailsComponent},
      { path :'', redirectTo: 'homepage', pathMatch:'full',},
    ]},

];
