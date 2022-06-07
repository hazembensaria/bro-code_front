import { Component, OnInit } from '@angular/core';
import {AuthServic} from "../../../../Services/auth.service";
import {BugService} from "../../../../Services/bug.service";

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css']
})
export class ShareDialogComponent implements OnInit {
user :any
  following :any
  constructor( private authservice :AuthServic ,private bugservice :BugService) { }
ids :string[]=[]
  ngOnInit(): void {
    console.log(this.bugservice.idBug)
    this.authservice.getUser().subscribe(usr=> {
      this.user = usr;
      console.log(this.user)

      this.authservice.getFollowing(this.user.following).subscribe(following => {
        console.log(following)
        this.following = following

      })
    })
  }
addUser(id :string){
  if(!this.ids.includes(id))
    this.ids.push(id)
  else
    this.ids.splice( this.ids.indexOf(id), 1);
  console.log(this.ids)
}
shareBug(){
this.bugservice.shareBug(this.bugservice.titleBug,this.user.imagepath , this.user.name,this.bugservice.idBug, this.ids)
}
}
