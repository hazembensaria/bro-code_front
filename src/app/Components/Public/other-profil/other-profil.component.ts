import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthServic} from "../../../Services/auth.service";

@Component({
  selector: 'app-other-profil',
  templateUrl: './other-profil.component.html',
  styleUrls: ['./other-profil.component.css']
})
export class OtherProfilComponent implements OnInit {

  constructor(private route:ActivatedRoute , private authservice :AuthServic) { }
userId : any
  ngOnInit(): void {
    this.route.paramMap.subscribe(param=>{
    this.userId =param.get("id")
      this.authservice.getVisitor(this.userId).subscribe(visitor=>{
        console.log(visitor)
      })
      console.log(this.userId)
    })
  }
  folowVisitor(){
    this.authservice.folowVisitor(this.userId)
  }
  test(){
    this.authservice.test().subscribe(res=>{

      console.log(res)
    })
  }
}
