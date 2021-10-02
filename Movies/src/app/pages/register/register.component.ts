import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  msg = ""
  registerForm = new FormGroup({
    name:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password:new FormControl('', [Validators.required, Validators.minLength(3)]),
    age: new FormControl(),
    phone: new FormControl()
  })
  get name(){
    return this.registerForm.get('name')
  }
  get age(){ 
    return this.registerForm.get('age')
  }
  get password(){ 
    return this.registerForm.get('password')
  }
  get email(){ 
    return this.registerForm.get('email')
  }
  get phone(){ 
    return this.registerForm.get('phone')
  }

  constructor( private _user:GlobalService, private _router:Router) { }

  ngOnInit(): void {
  }

  register(){
    this.msg = ""
    if(this.registerForm.valid){
      this._user.register(this.registerForm.value).subscribe(
        data=>{ 
          console.log(data)
         },
        (e)=>{
          this.msg = e.error.data
        },
        ()=>{
          this.msg = "Successfully registered" 
          this.registerForm.reset()
          this._router.navigateByUrl('/login')
        }
      )
    }
    else if(this.registerForm.value.name == "")
      this.msg = "Full name is required"
  }
}