import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {mimetype} from "../mime-type-check";
import {AuthServic} from "../../../../Services/auth.service";
import {PostService} from "../../../../Services/post.service";

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css']
})
export class AddPostDialogComponent implements OnInit {
  file : any
  form! :FormGroup
  imagepre : any
  firstname !: string
  lastname !: string
  userImage !: string
  constructor(private  postService : PostService , private authservice : AuthServic) { }

  ngOnInit(): void {
    this.authservice.getUser().subscribe(res=>{
      console.log(res)
      this.firstname =res.firstname;
      this.lastname =res.lastName ;
      console.log(this.lastname)
      this.userImage =res.imagepath ;

    })
    this.form = new FormGroup({
      imagepath : new FormControl( null, { asyncValidators : [mimetype]}),
      content  :new FormControl(null),
    })
  }

  onimagepicked(event : Event ){
    this.file = (event.target as HTMLInputElement).files?.item(0)
    this.form.patchValue({imagepath : this.file})
    this.form.get('image')?.updateValueAndValidity()
    console.log(this.form)
    const reader = new FileReader()
    reader.onload = ()=>{
      this.imagepre= reader.result
    }
    reader.readAsDataURL(this.file)
  }

  onAddPost(){
    console.log(this.form.value)
    this.postService.addPost(this.form , this.firstname ,this.lastname ,this.userImage)
  }
}
