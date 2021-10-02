import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(public _global:GlobalService) { }

  ngOnInit(): void {
  }

}
