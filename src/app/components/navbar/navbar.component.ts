import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn : boolean;
  public role = false;
  public notice = false;

  constructor( 
    private auth : AuthService,
    private router : Router,
    private token : TokenService,
    private notify : SnotifyService
  ) { }

  ngOnInit() {
    this.auth.authStatus.subscribe(value => this.loggedIn = value);
    if(JSON.parse(this.token.getUser())==null){
    this.role = false;
    this.notice = false
    } else {
    if(JSON.parse(this.token.getUser()).role=="CompanyAdmin" || JSON.parse(this.token.getUser()).role=="SchoolAdmin")
      this.role = true;
    else
      this.role = false;

      if(JSON.parse(this.token.getUser()).role!="CompanyAdmin")
      this.notice = true;
    else
      this.notice = false;
    }
    //console.log(this.loggedIn);
  }

  logout(Event = MouseEvent){
    event.preventDefault;
    
    this.token.remove();
    this.auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
    location.reload();
    this.notify.info("Logout Succesfully", {timeout:2000});
  }

}
