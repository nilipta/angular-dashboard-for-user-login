import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './shared/auth.guard';


const routes: Routes = [
  {
      path: 'signup', component: SignupComponent
  },
  { 
    path: 'login', component: SigninComponent
  
  },
  {
      path: 'userprofile', component: UserComponent,canActivate:[AuthGuard]
  },
  {
      path: '', redirectTo: '/login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// import { Routes } from '@angular/router';
// import { UserComponent } from './user/user.component';
// import { SignUpComponent } from './user/sign-up/sign-up.component';
// import { SignInComponent } from './user/sign-in/sign-in.component';
// import { UserProfileComponent } from './user-profile/user-profile.component';
// import { AuthGuard } from './auth/auth.guard';