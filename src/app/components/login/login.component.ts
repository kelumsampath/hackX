import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { TokenService } from '../../services/token.service';
import { Router, Route } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email : null,
    password : null,
    checked : false
  };

  public error = null;

  constructor(
    private api : ApiService,
    private token : TokenService,
    private router : Router,
    private auth : AuthService,
    private notify: SnotifyService
    ) {}

  ngOnInit() {    
  }

  onSubmit(){
    return this.api.post('login', this.form).subscribe(
      data => this.tokenHandler(data),
      error => this.notify.error(error.error.error, {timeout:0})
    );
  }

  tokenHandler(data){
    this.token.set(data);
    this.auth.changeAuthStatus(true);
    if(JSON.parse(this.token.getUser()).role=="CompanyAdmin" || JSON.parse(this.token.getUser()).role=="SchoolAdmin")
      this.router.navigateByUrl('/users');
    else
      this.router.navigateByUrl('/notice');
    location.reload();
    this.notify.info("Login Succesfully", {timeout:2000});
  }

}
