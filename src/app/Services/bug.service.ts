import { Injectable } from '@angular/core';
import {authModel} from "../Models/auth-Model";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {FormGroup, NgForm} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class BugService {
  constructor( private http : HttpClient) {}
  public idBug  ! :string
  public titleBug ! : string ;
  addBug(bug: any){

    this.http.post('https://oksecondetime.herokuapp.com/bug/add',bug).subscribe(job=>{
      console.log('bug added succefuly');
    })
  }
  getBugs(){
    return   this.http.get<[]>('https://oksecondetime.herokuapp.com/bug')
  }

  getBug(id :string){
   const obj={
      id :id
    }
    return   this.http.post('https://oksecondetime.herokuapp.com/bug/get',obj)
  }
  shareBug(title: string,image :string,name :string,idBug :string , ids :any){
    const obj = {
      title : title,
      image :image,
      name :name,
      idBug :idBug ,
      ids : ids
    }
    this.http.post('https://oksecondetime.herokuapp.com/bug/share',obj).subscribe(job=>{
      console.log('bug added succefuly');
    })
  }
  getShares(){
    return this.http.get<[]>('https://oksecondetime.herokuapp.com/bug/getShares')
  }
}
