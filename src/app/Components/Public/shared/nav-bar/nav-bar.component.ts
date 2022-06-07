import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthServic} from "../../../../Services/auth.service";
import {Router} from "@angular/router";
import {LikeService} from "../../../../Services/like.service";
import * as dayjs from 'dayjs'
import {PostService} from "../../../../Services/post.service";
import {BugService} from "../../../../Services/bug.service";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
user :any
  shares: any[]=[]


  color ! :string
  colors =['blue' ,'red', 'white']
  constructor(private authservice  : AuthServic,  private router : Router ,private postservice :PostService ,private bugservice :BugService) { }
filte :string =""
isconnected =false ;
  image !:string
  fname !: string
  hidden =false
  ngOnInit(): void {


    this.isconnected =this.authservice.getIsLogedNow()
    if (this.isconnected) {
      this.authservice.getUser().subscribe(user => {
        this.user = user;
        this.image = user.imagepath
        this.fname =user.firstname
      })
      this.bugservice.getShares().subscribe(shares=>{
   this.shares=shares
        console.log(shares)
      })
    }
  }
  onlogout(){
    this.authservice.logout()
    this.router.navigate(['login'])
  }
  chooseColor(color :string){
    this.color = color
  }
  getbug(id :string){
    this.router.navigate(['bug/'+id])
  }
  test(){

  }
}
