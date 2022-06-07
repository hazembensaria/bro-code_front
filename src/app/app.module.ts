import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Public/auth/login/login.component';
import {RegisterComponent} from "./Components/Public/auth/register/register.component";
import { LandingPageComponent} from "./Components/Public/landing-page/landing-page.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {authInteractor} from "./Components/Public/auth/auth-Interactor";
import { NavBarComponent } from './Components/Public/shared/nav-bar/nav-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfilComponent}  from "./Components/Public/profil/profil.component";
import { HomeComponent } from './Components/Public/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from "./Components/Public/dialoge/upgrad-profil-dialog/dialog.component";
import { SelectLangugesComponent } from './Components/Public/dialoge/select-languges/select-languges.component';
import { PhotoDialogComponent } from './Components/Public/dialoge/photo-dialog/photo-dialog.component';
import {AddPostDialogComponent} from "./Components/Public/dialoge/add-post-dialog/add-post-dialog.component";
import { OtherProfilComponent } from './Components/Public/other-profil/other-profil.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { JobsComponent } from './Components/Public/jobs/jobs.component';
import { SinglePostComponent } from './Components/Public/single-post/single-post.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import { JobDialogComponent } from './Components/Public/dialoge/job-dialog/job-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from "@angular/material/select";
import { BugsComponent } from './Components/Public/bugs/bugs.component';
import { AuthDialogComponent } from './Components/Public/dialoge/auth-dialog/auth-dialog.component';
import { ChartsComponent } from './Components/Private/charts/charts.component';
import { UserJobsComponent } from './Components/Public/user-jobs/user-jobs.component';
import { SavesComponent } from './Components/Public/saves/saves.component';
import { BugDialogComponent } from './Components/Public/dialoge/bug-dialog/bug-dialog.component';
import { ShareDialogComponent } from './Components/Public/dialoge/share-dialog/share-dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SingleBugComponent } from './Components/Public/single-bug/single-bug.component';

@NgModule({
  declarations: [
  AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent,
    NavBarComponent,
    ProfilComponent,
    HomeComponent,
    DialogComponent,
    SelectLangugesComponent,
    PhotoDialogComponent,
    AddPostDialogComponent,
    OtherProfilComponent,
    JobsComponent,
    SinglePostComponent,
    JobDialogComponent,
    BugsComponent,
    AuthDialogComponent,
    ChartsComponent,
    UserJobsComponent,
    SavesComponent,
    BugDialogComponent,
    ShareDialogComponent,
    SingleBugComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule ,
    MatSlideToggleModule


  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:authInteractor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
