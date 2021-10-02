import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _global:GlobalService, private _router:Router) { }

  ngOnInit(): void {
    this._global.me().subscribe(
      data=>{console.log(data)},
      ()=>{
        this._router.navigate(['/login'])
      },
      ()=>{}
    )    
  }
}
