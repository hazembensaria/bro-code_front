import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialoge/upgrad-profil-dialog/dialog.component';
import {AuthServic} from "../../../Services/auth.service";
import {SelectLangugesComponent} from "../dialoge/select-languges/select-languges.component";
import {HttpClient} from "@angular/common/http";
import {PhotoDialogComponent} from "../dialoge/photo-dialog/photo-dialog.component";
import {PostService} from "../../../Services/post.service";
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
user : any ;
  opened = false;
userStatus : any ;
userId :any
  img !:string
  name ! : string
  posts  :any =[]
  constructor(private postservice : PostService , public dialog: MatDialog, private  authservice  : AuthServic ,private http:HttpClient ) { }
  ngOnInit(): void {
    this.authservice.getUser().subscribe(res=>{
      this.img = res.imagepath

      if(res.isNew){
        this.dialog.open(SelectLangugesComponent , { height: '30%',
          width: '50%'  });
        this.http.put('http://localhost:8000/api/user/updated',{result:true,}).subscribe(()=>{
          console.log("updated")});
      }
      this.user = res ;
      console.log(this.user)
      this.postservice.getUsersPosts().subscribe(posts=>{
        this.posts= posts
        console.log(this.posts)
      })
    })
  }

  updateProfil(){
    this.dialog.open(DialogComponent , { height: '90%',
      width: '40%'});
  }
  changePhoto(){
    this.dialog.open(PhotoDialogComponent , { height: '90%',
      width: '40%'});
  }

  turnOffComments(idpost :string ,comments :boolean){
    console.log(idpost)
    console.log(comments)
    if(comments)

      this.postservice.turnOffComments(idpost)
    else
      this.postservice.turnOnComments(idpost)
  }
switchState(idpost :string ,state :boolean){
  this.postservice.switchState(idpost ,state)
}
deletePost(idPost :string){
  for(let i of this.posts){
    if(i._id===idPost)
    this.posts.splice( this.posts.indexOf(i), 1);
  }

this.postservice.deletePost(idPost)
}
}
