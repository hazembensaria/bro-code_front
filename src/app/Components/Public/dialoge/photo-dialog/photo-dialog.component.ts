import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {mimetype} from "../mime-type-check";
import {AuthServic} from "../../../../Services/auth.service";

@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.css']
})
export class PhotoDialogComponent implements OnInit {
  file : any
  form! :FormGroup
  imagepre : any
  constructor( private authservice :  AuthServic) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      imagepath : new FormControl( null, { asyncValidators : [mimetype]}),
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
  onChangeImage(){

      // console.log(this.form)
      this.authservice.changeimage(this.form)

  }
}
