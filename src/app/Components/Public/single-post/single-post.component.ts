import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../../Services/post.service";
import {AuthServic} from "../../../Services/auth.service";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {mimetype} from "../dialoge/mime-type-check";
import {CommentService} from "../../../Services/comment.service";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
postId ! :any
  posterId :any
  comments : any
  poster :any
  post : any
  scroll = false
  opened = false;
user : any
form !:FormGroup
  constructor(private route:ActivatedRoute , private postservice :PostService , private authservice :AuthServic , private comentService :CommentService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      content : new FormControl( null)
    })
    this.route.paramMap.subscribe(param=>{
      this.postId=param.get("id")
      this.posterId =param.get("poster")
      console.log(this.posterId)
      this.postservice.getPost(this.postId).subscribe(post=>{
        this.post =post
        console.log(post)
      })
      this.authservice.getVisitor(this.posterId).subscribe(poster=>{
        this.poster =poster
        console.log(this.poster)
      })

    })
    this.comentService.getComments(this.postId).subscribe(comments=>{

      this.comments =comments
      console.log(this.comments)
    })
    this.authservice.getUser().subscribe(user=>{
      this.user=user
      console.log(user)
    })
  }

  @HostListener("document : scroll")
  scrollTop(){
    if(document.documentElement.scrollTop>20)
      this.scroll = true
    else
      this.scroll = false
  }
  onSubmit(){
this.comments.push(this.form.value.content)
    this.comentService.addComment(this.form.value.content , this.postId , this.user.name , this.user.imagepath)
this.form.reset()
  }

}
