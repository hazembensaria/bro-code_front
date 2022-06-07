import { Component, OnInit } from '@angular/core';
import {AuthServic} from "../../../Services/auth.service";
import {AddPostDialogComponent} from "../dialoge/add-post-dialog/add-post-dialog.component";
import {JobDialogComponent} from "../dialoge/job-dialog/job-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {JobService} from "../../../Services/job.service";


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
 isconnected =false
  userId !:string
  user :any
  jobs :any
  level=['entry' , 'intermediaire' ,'expert']
  type=['full_time' ,'freelance' ,'part_time']
  location=['on_site' ,'remote']
  levelStatus =false
  typeStatus =false
  locationStatus = false
  filters :string[] =[]
  constructor(private authservice :AuthServic , public dialog: MatDialog, private jobservice :JobService) { }

  ngOnInit(): void {
    this.isconnected =this.authservice.getIsLogedNow()
    this.jobservice.getJobs().subscribe(jobs=>{
      this.jobs =jobs

    })
    if (this.isconnected){
      this.authservice.getUser().subscribe(usr=>{
        this.user =usr ;
        this.userId =usr._id})}
  }
addJob(){
  this.dialog.open(JobDialogComponent, { height: '90%',
    width: '50%'});
}
filter(str :string){
   if(!this.filters.includes(str))
 this.filters.push(str)
  else
     this.filters.splice( this.filters.indexOf(str), 1);
}
clearAll(){
this.locationStatus= false
  this.levelStatus=false
  this.typeStatus = false
}

  applyJob(idpost :string, iduser :string){
    this.jobservice.applyJob(idpost ,iduser)
  }
}
