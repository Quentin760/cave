import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { WineListComponent } from './wine-list/wine-list.component';
import { WineFormComponent } from './wine-list/wine-form/wine-form.component';
import { SignupComponent } from './user/signup/signup.component';
import { SigninComponent } from './user/signin/signin.component';
import { SingleWineComponent } from './wine-list/single-wine/single-wine.component';

import { AuthGuardService } from "./services/auth-guard.service";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  { path: 'user/signup', component: SignupComponent },
  { path: 'user/signin', component: SigninComponent },
  { path: 'wines', canActivate: [AuthGuardService], component: WineListComponent },
  { path: 'wines/new', canActivate: [AuthGuardService], component: WineFormComponent },
  { path: 'wines/view/:id', canActivate: [AuthGuardService], component: SingleWineComponent },
  { path: '', redirectTo: 'wines', pathMatch: 'full' },
  { path: '**', redirectTo: 'wines' }

];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
