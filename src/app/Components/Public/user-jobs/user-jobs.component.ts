import { Component, OnInit } from '@angular/core';
import {JobService} from "../../../Services/job.service";
import {Router} from "@angular/router";
import {observable} from "rxjs";

@Component({
  selector: 'app-user-jobs',
  templateUrl: './user-jobs.component.html',
  styleUrls: ['./user-jobs.component.css']
})
export class UserJobsComponent implements OnInit {
jobs :any
  users:any =[]
  constructor(private jobservice :JobService ,private router : Router) { }

  ngOnInit(): void {
    this.jobservice.getUserJobs().subscribe(jobs=>{
      console.log(jobs)
      this.jobs =jobs
    })
  }
showApplied(idJob :string){
  console.log(idJob)
  this.jobservice.showApplied(idJob).subscribe(res=>{
    console.log(res)
    this.users= res
  })
}

  visitProfil(id : string){
      this.router.navigate([`otherProfil/${id}`])
  }
  switchStatus(idjob :string ,stutas :boolean){
this.jobservice.switchStatus(idjob ,stutas).subscribe(_=>{
  console.log('status updated ')
})
  }
  deleteJob(jobId :string){
    console.log(jobId)
  this.jobservice.deleteJob(jobId).subscribe(_=>{
    console.log(' job deleted')
  })
  }
}
