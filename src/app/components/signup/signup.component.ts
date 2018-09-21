import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    name : null,
    email : null,
    password : null,
    password_confirmation : null,
    terms : false,
    role : null
  };

  public error = [];
  public company = true;

  constructor(
    private api : ApiService,
    private token : TokenService,
    private router : Router,
    private notify : SnotifyService
    ) { }

  ngOnInit() {
    var user = JSON.parse(this.token.getUser());
    var role = user.role;
  }

  onSubmit(){
    return this.api.post('signup', this.form).subscribe(
      data => this.tokenHandler(data),
      error => this.errorHandle(error)
    );
  }

  tokenHandler(data){
    this.notify.info("Added Succesfully", {timeout:2000});
    //this.token.set(data);
    this.router.navigateByUrl('/users');
  }
  
  errorHandle(error){
    this.error = error.error.errors;
  }

}
