import { Injectable } from '@angular/core';
import {authModel} from "../Models/auth-Model";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {FormGroup, NgForm} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor( private http : HttpClient) {}

  addJob(job : any){

    this.http.post('https://oksecondetime.herokuapp.com/job/add',job).subscribe(job=>{
      console.log('job added succefuly');
    })
  }
  getJobs(){
    return   this.http.get<[]>('https://oksecondetime.herokuapp.com/job')
  }
  getUserJobs(){
    return   this.http.get<[]>('https://oksecondetime.herokuapp.com/job/userJobs')
  }
  applyJob(idpost :string , iduser :string){
    const apply ={
      idpost :idpost ,
      iduser : iduser
    }
    this.http.post('https://oksecondetime.herokuapp.com/job/apply',apply).subscribe(job=>{
      console.log('apply added succefuly');
    })
  }

  sugest(lang :any){
   const obj ={
     lang :lang
   }
    return this.http.post<[]>('https://oksecondetime.herokuapp.com/job/sugest',obj)


  }

  showApplied(idJob :string){
    const obj ={
      idJob :idJob
    }
    return this.http.post<[]>('https://oksecondetime.herokuapp.com/job/showApplied',obj)

  }
switchStatus(idjob :string , status :boolean){
  const obj ={
    idJob :idjob ,
    status :status
  }
  return this.http.post('https://oksecondetime.herokuapp.com/job/switchStatus',obj)

}
deleteJob(jobId :string){
  const obj ={
    idJob :jobId
  }
  return this.http.post('https://oksecondetime.herokuapp.com/job/deleteJob',obj)

}
}
