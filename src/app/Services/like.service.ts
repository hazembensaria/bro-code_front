import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http : HttpClient , private router : Router){}


  onLikePost(idpost :string , categ :string){
    const like ={
      idpost : idpost,
      categ :categ
    }
    this.http.post<{msg :string, fmessage :any}>('https://oksecondetime.herokuapp.com/like',like)
      .subscribe(
        (resp)=>{
          console.log(resp)
        })
  }

  getLikes(){

    return this.http.get<{ product :any ,likes:any}>('https://oksecondetime.herokuapp.com/like')

  }
  getUserLIkedPosts(){

    return this.http.get< [{_id :string , idpost: string  , iduser : string , date : Date}] >
    ('https://oksecondetime.herokuapp.com/like/userlikedposts')
  }
  deleteLike( id : string){

    return this.http.delete('https://oksecondetime.herokuapp.com/like/'+ id)

  }


}
