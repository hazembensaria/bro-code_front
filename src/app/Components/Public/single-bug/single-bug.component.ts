import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BugService} from "../../../Services/bug.service";
import {ShareDialogComponent} from "../dialoge/share-dialog/share-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-single-bug',
  templateUrl: './single-bug.component.html',
  styleUrls: ['./single-bug.component.css']
})
export class SingleBugComponent implements OnInit {
 bugId ! :any
  bug :any
  constructor(private route:ActivatedRoute , private bugservice : BugService ,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param=>{
      this.bugId=param.get("id")
      console.log(this.bugId)
    })

     this.bugservice.getBug(this.bugId).subscribe(res=>{
       console.log(res)
       this.bug =res
     })
  }
  shareBug(idBug :string ,titleBug :string){
    this.bugservice.idBug=idBug
    this.bugservice.titleBug=titleBug
    console.log(this.bugservice.idBug)
    this.dialog.open(ShareDialogComponent, { height: '90%',
      width: '50%'});
  }
}
