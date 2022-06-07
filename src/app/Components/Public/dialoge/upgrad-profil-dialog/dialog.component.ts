import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {authModel} from "../../../../Models/auth-Model";
import {AuthServic} from "../../../../Services/auth.service";

@Component({
  selector: 'app-upgrad-profil-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private authserrvice :AuthServic) { }
user :any
  ngOnInit(): void {
    this.authserrvice.getUser().subscribe(res=>{
      this.user =res;
      console.log(this.user)
    })

  }
  onSubmit(myForm:NgForm){
    console.log(myForm.form.value)
    this.authserrvice.upgradeProfile(myForm)

  }
}
