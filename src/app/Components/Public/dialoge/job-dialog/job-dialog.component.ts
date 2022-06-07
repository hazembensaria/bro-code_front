import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {LoginComponent} from "../../auth/login/login.component";
import {JobService} from "../../../../Services/job.service";
import {AuthServic} from "../../../../Services/auth.service";


@Component({
  selector: 'app-job-dialog',
  templateUrl: './job-dialog.component.html',
  styleUrls: ['./job-dialog.component.css']
})
export class JobDialogComponent implements OnInit {
  level=['entry' , 'intermediaire' ,'expert']
  type=['full_time' ,'freelance' ,'part_time']
  location=['on_site' ,'remote']
  jobLevel !:string
  jobType !: string
  jobLocation ! :string
  langage = ['html' ,'java', 'c#' , 'css', 'javascript']
  langageSelected : string[] =[]
user :any
  options: FormGroup;
  colorControl = new FormControl('primary');
  constructor(fb: FormBuilder , private jobservice  :JobService,private authservice :AuthServic) {
    this.options = fb.group({
      color: this.colorControl,
    });
  }

  ngOnInit(): void {
    this.authservice.getUser().subscribe(user=>{
      this.user= user
      console.log(this.user)
    })

  }
getLevel(level : string)
{
 this.jobLevel=level
}
  getType(type: string)
  {
   this.jobType =type
  }
  getLocation(location : string)
  {
    this.jobLocation= location
  }

  onSubmit(myForm:NgForm){
    console.log(this.jobLocation, this.jobType ,  this.jobLevel)
    console.log(myForm.form.value)
    const obj = {
      name :this.user.name,
      imagepath :this.user.imagepath,
      level :this.jobLevel,
      location :this.jobLocation,
      type :this.jobType ,
      content :myForm.form.value.content,
      salary :myForm.form.value.salary,
      tech : this.langageSelected
    }
    this.jobservice.addJob(obj)
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
