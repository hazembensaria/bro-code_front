import { Component, OnInit } from '@angular/core';
import {JobDialogComponent} from "../dialoge/job-dialog/job-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {BugDialogComponent} from "../dialoge/bug-dialog/bug-dialog.component";
import {BugService} from "../../../Services/bug.service";
import {ShareDialogComponent} from "../dialoge/share-dialog/share-dialog.component";
import {FormControl, FormGroup} from "@angular/forms";
import {CommentService} from "../../../Services/comment.service";
import {AuthServic} from "../../../Services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})
export class BugsComponent implements OnInit {

  constructor(private route :Router , private authservice : AuthServic ,public dialog: MatDialog, private bugservice :BugService ,private comentService :CommentService) { }
bugs :any
  user :any
  comments : any
  panelOpenState = false;
  commentClicked =false
  form !:FormGroup
  filterBug :string =""

  ngOnInit(): void {

    this.form = new FormGroup({
      content : new FormControl( null)
    })
    this.bugservice.getBugs().subscribe(bugs=>{
      this.bugs=bugs
      console.log(this.bugs)
    })
    this.authservice.getUser().subscribe(user=>{
      this.user=user
      console.log(user)
    })
  }
  addBug(){
    this.dialog.open(BugDialogComponent, { height: '90%',
      width: '50%'});
  }
shareBug(idBug :string ,titleBug :string){
    this.bugservice.idBug=idBug
  this.bugservice.titleBug=titleBug
  console.log(this.bugservice.idBug)
  this.dialog.open(ShareDialogComponent, { height: '90%',
    width: '50%'});
}

  onSubmit(postId :string){
    console.log(this.form.value)
    this.comentService.addComment(this.form.value.content ,postId, this.user.name , this.user.imagepath)
    this.form.reset()
  }
getComments(id :string){
  if(!this.commentClicked){
    this.comentService.getComments(id).subscribe(comments=>{

      this.comments =comments
      console.log(this.comments)
    })
  }else{
    this.comments=[] ;
  }
  this.commentClicked= !this.commentClicked

}
  singalBug(id : string){
    this.route.navigate(['bug/'+id])
  }
}
