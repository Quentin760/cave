import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './user/signup/signup.component';
import { SigninComponent } from './user/signin/signin.component';
import { WineListComponent } from './wine-list/wine-list.component';
import { SingleWineComponent } from './wine-list/single-wine/single-wine.component';
import { WineFormComponent } from './wine-list/wine-form/wine-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from "./services/auth.service";
import { WinesService } from "./services/wines.service";
import { AuthGuardService  } from "./services/auth-guard.service";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    WineListComponent,
    SingleWineComponent,
    WineFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpModule
    
  ],
  providers: [ AuthService, WinesService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
