import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {authModel} from "../../../../Models/auth-Model";
import {AuthServic} from "../../../../Services/auth.service";

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent implements OnInit {

  constructor(private  authService:AuthServic) { }

  ngOnInit(): void {
  }
  onSubmit(myForm:NgForm){
    const user:authModel={email:myForm.value.email,password:myForm.value.password}
    this.authService.loginUser(user.email,user.password);
  }

}
