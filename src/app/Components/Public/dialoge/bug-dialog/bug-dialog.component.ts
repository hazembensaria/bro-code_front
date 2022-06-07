import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthServic} from "../../../../Services/auth.service";
import {BugService} from "../../../../Services/bug.service";

@Component({
  selector: 'app-bug-dialog',
  templateUrl: './bug-dialog.component.html',
  styleUrls: ['./bug-dialog.component.css']
})
export class BugDialogComponent implements OnInit {

  constructor(private authservice :AuthServic , private bugservice :BugService) { }
user: any
  langage = ['html' ,'java', 'c#' , 'css', 'javascript']
  langageSelected : string[] =[]
  ngOnInit(): void {
    this.authservice.getUser().subscribe(user=>{
      this.user= user ;
    })
  }
  onSubmit(myForm:NgForm){
    console.log(myForm.form.value)
    const obj = {
      name :this.user.name,
      imagepath :this.user.imagepath ,
      content :myForm.form.value.content,
      title :myForm.form.value.salary,
      tags : this.langageSelected

    }
    console.log(obj)
    this.bugservice.addBug(obj)
    // this.jobservice.addJob(obj)
    // this.authserrvice.upgradeProfile(myForm)

  }
  selectLangage(role :string){
    if(!this.langageSelected.includes(role)){
      this.langageSelected.push(role)
      console.log(this.langageSelected)
    }else {
      this.langageSelected.splice( this.langageSelected.indexOf(role), 1);
      console.log(this.langageSelected)
    }

  }
}
