import { Component, OnInit } from '@angular/core';
import {AuthServic} from "../../../Services/auth.service";
import {PhotoDialogComponent} from "../dialoge/photo-dialog/photo-dialog.component";
import {AddPostDialogComponent} from "../dialoge/add-post-dialog/add-post-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {PostService} from "../../../Services/post.service";
import {LikeService} from "../../../Services/like.service";
import * as dayjs from "dayjs";
import {Router} from "@angular/router";
import {CommentService} from "../../../Services/comment.service";
import {JobService} from "../../../Services/job.service";

import {AuthDialogComponent} from "../dialoge/auth-dialog/auth-dialog.component";

/**
 * @title Menu with icons
 */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private jobservice :JobService, private router : Router,private authservice : AuthServic, public dialog: MatDialog , private postservice : PostService , private likeservice :LikeService ,private commentService :CommentService) { }
user :any
  isconnected =false
  posts  :any =[]
  jobs :any =[]
  following :any =[]
  categori :string[]=[]
  currentCateg:string[]=[]
  postsUserLikes: string[] = []
  scroll =false
  postslike :string[]=[]
  likescount :number[]=[]
  userId ! :string
  filterBug :string []=[]
  click= false ;
  ngOnInit(): void {

    this.isconnected =this.authservice.getIsLogedNow()
 // ------------------ importing the posts that the user liked ------------------
    if (this.isconnected) {
      this.likeservice.getUserLIkedPosts().subscribe(resul => {
        for (let i of resul) {
          this.postsUserLikes.push(i.idpost)
          console.log(this.postsUserLikes)

        }
        // ----------------- importing the posts which have likes and puth them in 2 array . the id in the firdt and the count of likes in the second
        this.likeservice.getLikes().subscribe(res => {

          for (let i of res.product) {
            this.postslike.push(i._id)
            this.likescount.push(i.count)
          }
          this.postservice.getPosts().subscribe(posts => {
            console.log(posts)
            for (let i of posts) {

              if (this.postslike.indexOf(i._id) >= 0) {
                var nblikes = this.likescount[this.postslike.indexOf(i._id)]

              } else {
                nblikes = 0
              }
              const obj = {
                nblikes: nblikes,
                idPost: i._id,
                img: i.imagepath,
                cont: i.content,
                id: i.userId,
                userimg: i.userimage,
                lname: i.lname,
                fname: i.fname,
                date: dayjs(i.date).format('MMM /DD  HH:mm A'),
                fulldate: dayjs(i.date).format('dddd MMMM /DD /YYYY HH:mm A'),
                categ: i.categori ,
                comments :i.comments,
                private : i.private
              }
              this.posts.push(obj)

            }
          })
        })

      })
    }else {
      this.likeservice.getLikes().subscribe(res => {

        for (let i of res.product) {
          this.postslike.push(i._id)
          this.likescount.push(i.count)
        }
        this.postservice.getPosts().subscribe(posts => {

          for (let i of posts) {

            if (this.postslike.indexOf(i._id) >= 0) {
              var nblikes = this.likescount[this.postslike.indexOf(i._id)]

            } else {
              nblikes = 0
            }
            const obj = {
              nblikes: nblikes,
              idPost: i._id,
              img: i.imagepath,
              cont: i.content,
              id: i.userId,
              userimg: i.userimage,
              lname: i.lname,
              fname: i.fname,
              date: dayjs(i.date).format('MMM /DD  HH:mm A'),
              fulldate: dayjs(i.date).format('dddd MMMM /DD /YYYY HH:mm A'),
              categ: i.categori ,
              comments :i.comments
            }
            this.posts.push(obj)
            console.log(this.posts)
          }
        })
      })
    }
    if (this.isconnected) {
      this.postservice.getReadLaters().subscribe(res => {

        for (let i of res){
          this.categori.push(i.idpost)
        }


      }
      )
    }

    if (this.isconnected){
    this.authservice.getUser().subscribe(usr=>{
      this.user =usr ;
      this.userId =usr._id
      this.authservice.getFollowing(this.user.following).subscribe(following=>{

        this.following =following

      })
      this.jobservice.sugest(this.user.langage).subscribe(jobs=>{

        for(let i=0 ; i<2 ;i++){
          this.jobs.push(jobs[i])
        }


      })

    })}

  }

  onAddPost(){
    this.dialog.open(AddPostDialogComponent , { height: '90%',
      width: '40%'});
  }

  onLikePost(idpost : string , nblikes :number , categ :string){
    if(this.isconnected){


      if(this.postsUserLikes.indexOf(idpost)<0){
        for(let i of this.posts){
          if(i.idPost===idpost){
            i.nblikes=nblikes+1
          }
        }

        this.postsUserLikes.push(idpost)
        this.likeservice.onLikePost(idpost,categ)

      }
      else{
        for(let i of this.posts){
          if(i.idPost===idpost){
            i.nblikes=nblikes-1
          }
        }

        this.postsUserLikes.splice(this.postsUserLikes.indexOf(idpost),1)
        this.likeservice.deleteLike(idpost).subscribe(res=>{
          console.log(this.categori)
        })

      }

    }
    else{

      this.dialog.open(AuthDialogComponent);

    }
  }




  readLater(idpost : string){
    if(this.isconnected){

      if(this.categori.indexOf(idpost)<0){
        this.postservice.onReadLater(idpost)
        this.categori.push(idpost)
      }
      else{
        this.currentCateg.splice(this.currentCateg.indexOf(idpost),1)
        this.categori.splice(this.categori.indexOf(idpost),1)
        this.postservice.deleteReadLaterPost(idpost).subscribe(res=>{
          console.log('hhhhhhh')
          console.log(this.categori)
        })
      }

    }
    else{
      this.dialog.open(AuthDialogComponent);
    }
  }



  visitProfil(id : string){

    console.log(this.userId)
    console.log(id)
    if(id===this.userId)
      this.router.navigate(["profil"])
    else
      this.router.navigate([`otherProfil/${id}`])
  }
  readPost(postId : string , poster : string){
    this.router.navigate([`post/${postId}/${poster}`])
  }
  turnOffComments(idpost :string ,comments :boolean){
    console.log(comments)
    if(comments)

    this.postservice.turnOffComments(idpost)
    else
      this.postservice.turnOnComments(idpost)
  }

  showReaDLater(){
    if(!this.click){
      this.filterBug =this.postsUserLikes ;
      console.log(this.filterBug)
    }else
    {
      this.filterBug =[]
    }
this.click =! this.click
  }
}
