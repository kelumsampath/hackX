import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public form = {
    email : null,
    access_token : null
  };

  public formid = {
    id : 0,
    email : null,
    access_token : null
  };
  user = null;
  public role = null;
  public users = null;

  constructor(
    private token : TokenService, 
    private router : Router,
    private api : ApiService, 
    private notify : SnotifyService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(this.token.getUser());
    this.role = this.user.role;
    this.form.email = this.user.email;
    this.form.access_token = this.token.get();
    this.formid.email = this.user.email;
    this.formid.access_token = this.token.get();

    if(this.role != 'CompanyAdmin' && this.role != 'SchoolAdmin')
      this.router.navigateByUrl("/notice");
    return this.api.post('users/get', this.form).subscribe(
      data => this.handler(data),
      error => this.notify.error(error.error.error, {timeout:0}))
  }
  

  handler(data){
    this.users = data;
  }

  delete(id){
    this.notify.confirm('Are you sure you want to detele this Notice?', 'Delete Notice', {
      timeout: 0,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      buttons: [
        {text: 'Yes', action: () => {
          this.formid.id = id;
          this.api.post('users/delete', this.formid).subscribe(
            data => this.notifi(data),
            error => this.notify.error(error.error.error, {timeout:0})
          )}, bold: false},
        {text: 'No'}
      ]
    });
  }

  notifi(data){
    //console.log(data);
    this.notify.info(data.data, {timeout:2000})
    setTimeout(1000);
    this.ngOnInit();
  }

}
