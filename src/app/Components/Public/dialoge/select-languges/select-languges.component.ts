import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {authModel} from "../../../../Models/auth-Model";
import {AuthServic} from "../../../../Services/auth.service";

@Component({
  selector: 'app-select-languges',
  templateUrl: './select-languges.component.html',
  styleUrls: ['./select-languges.component.css']
})
export class SelectLangugesComponent implements OnInit {
  constructor( private authservice : AuthServic) { }

langage = ['html' ,'java', 'c#' , 'css', 'javascript']
langageSelected : string[] =[]
  ngOnInit(): void {
    console.log(this.langageSelected)
  }
  selectLangage(role :string){

    this.langageSelected.push(role)
    console.log(this.langageSelected)
  }
  saveLangage(){
// @ts-ignore
    this.authservice.saveLangage(this.langageSelected)
  }
}
