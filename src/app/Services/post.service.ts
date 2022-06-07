import { Injectable } from '@angular/core';
import {authModel} from "../Models/auth-Model";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {FormGroup, NgForm} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class PostService {

  filter !:string
  f = new Subject<string>()
  constructor( private http : HttpClient) {}

  addPost(form : FormGroup ,fname :string ,lname :  string , userimage : string){
    const userdata = new FormData()
    userdata.append('content' ,form.value.content)
    userdata.append('categori' ,"dev")
    userdata.append('firstname' ,fname)
    userdata.append('userimage' ,userimage)
    userdata.append('lastname' ,lname)
    userdata.append('img' ,form.value.imagepath , "hazem")
    this.http.post('https://oksecondetime.herokuapp.com/post/add',userdata).subscribe(reslt=>{
      console.log(reslt)
    })
  }
  getPosts(){
   return  this.http.get<[{_id :string , imagepath: string, content :string , categori :string , date :Date ,userimage :string ,lname :string ,fname :string ,userId :string , comments :boolean ,private :boolean}]>('https://oksecondetime.herokuapp.com/post')

  }

  getUsersPosts(){
    return  this.http.get<[]>('https://oksecondetime.herokuapp.com/post/userPosts')

  }
  getPost(id : string){
    const obj={
      id :id
    }
    return  this.http.post<{_id :string , imagepath: string, content :string , categori :string , date :Date ,userimage :string ,lname :string ,fname :string ,userId :string }>('https://oksecondetime.herokuapp.com/post/getPost', obj)

  }

  onReadLater(idpost :string ){
    const readLater ={
      idpost : idpost
    }
    this.http.post<{msg :string, fmessage :any}>('https://oksecondetime.herokuapp.com/post/readlater',readLater)
      .subscribe(
        (resp)=>{
          console.log(resp)
        })
  }


  deleteReadLaterPost( id : string){

    return this.http.delete('https://oksecondetime.herokuapp.com/post/deletereadlater/'+ id)

  }

  getReadLaters(){

    return this.http.get< [{_id :string , idpost: string  , iduser : string , date : Date}] >
    ('https://oksecondetime.herokuapp.com/post/getreadlater/')
  }

  turnOffComments(idpost :string){
    const obj ={
      id :idpost
    }
    this.http.post('https://oksecondetime.herokuapp.com/post/turnOffComments' ,obj).subscribe(res=>{
      console.log(res)
    })
  }
  turnOnComments(idpost :string){
    const obj ={
      id :idpost
    }
    this.http.post('https://oksecondetime.herokuapp.com/post/turnOnComments' ,obj).subscribe(res=>{
      console.log(res)
    })
  }
  switchState(idpost :string , state :boolean){
    const obj ={
      state :state,
      id :idpost
    }
    this.http.post('https://oksecondetime.herokuapp.com/post/switchState' ,obj).subscribe(res=>{
      console.log(res)
    })
  }
  deletePost(idpost :string ){
    const obj ={

      id :idpost
    }
    this.http.post('https://oksecondetime.herokuapp.com/post/deletePost' ,obj).subscribe(res=>{
      console.log(res)
    })
  }

}

