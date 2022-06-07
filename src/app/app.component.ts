import { Component } from '@angular/core';
import {AuthServic} from "./Services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BroCode-FrontEND';
  constructor(private authservice : AuthServic) {
  }
  ngOnInit(): void {
this.authservice.autoAuthUser()
  }
}

