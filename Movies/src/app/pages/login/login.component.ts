import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })

  constructor(private _global:GlobalService, private _router:Router) { }

  ngOnInit(): void {
  }

  login(){
    this._global.login(this.loginForm.value).subscribe(
      data=>{
        console.log(data),
        localStorage.setItem('userToken', data.data.token)
      },
      ()=>{},
      ()=>{
        this._router.navigateByUrl('/home')
      }
    )
  }

}
