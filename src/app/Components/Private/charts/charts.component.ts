import { Component, OnInit } from '@angular/core';
import {AuthServic} from "../../../Services/auth.service";
import {Chart ,registerables} from "chart.js";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  fb !:number
  twt! :number
  lkin ! :number
  git !: number
  data: number[] = []
  date: any = []


  constructor(private authservice: AuthServic) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.authservice.getUsersStatistic().subscribe(res => {
      console.log(res)

      for (let i of res.states) {
        this.data.push(i.count)
        this.date.push(i._id)
      }
      this.fb=res.fb.length
      this.twt=res.twitter.length
      this.lkin=res.linkedin.length
      this.git =res.github.length
      const chart = new Chart('chart', {
        type: 'line',
        data: {
          labels:this.date,
          datasets: [{
            data: this.data,
            pointBackgroundColor:  '#009688',
            showLine: true,
            borderColor: '#009688',
            fill :true
          }]
        },
        options:{
          plugins:{
            legend:{
              display:false
            }
          }
        }
      });



      const chart2 = new Chart('chart2',{
        type: 'scatter',
        data: {
          datasets: [{
            backgroundColor:'#009688',
            type: 'bar',
            label: 'social media variation',
            data: [this.fb, this.twt , this.lkin ,this.git]
          }],
          labels: ['facebook', 'twitter', 'linkedin' ,'gitHub']
        }
      })
    })



  }

}
