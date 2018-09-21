import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public form = {
    email : null,
    access_token : null
  };

  public formid = {
    email : null,
    access_token : null,
    id : 0
  };

  public notice = null;

  public  not = null;


  public ed = {
    email : null,
    access_token : null,
    id : 0,
    title : null,
    notice : null,
    role : null
  }

  public eda = {
    email : null,
    access_token : null,
    title : null,
    notice : null,
    role : null
  }

  user = null;
  public role = null;
  public staff = false;
  public admin = false;

  constructor(private token : TokenService, private http : HttpClient, private router : Router,private api : ApiService, private notify : SnotifyService) { }

  ngOnInit() {
    this.user = JSON.parse(this.token.getUser());
    this.role = this.user.role;
    this.form.email = this.user.email;
    this.form.access_token = this.token.get();
    this.formid.email = this.user.email;
    this.formid.access_token = this.token.get();
    this.ed.email = this.user.email;
    this.ed.access_token = this.token.get();
    this.eda.email = this.user.email;
    this.eda.access_token = this.token.get();

    if(this.role == 'CompanyAdmin')
      this.router.navigateByUrl("/users");

    if(this.role=="Student" || this.role=="Parent")
      this.staff = false;
    else
      this.staff = true;

    return this.api.post('notice/get', this.form).subscribe(
      data => this.handler(data),
      error => this.notify.error(error.error.error, {timeout:0})
    );
  }

  handler(data){
    this.notice = data;
  }

  notifi(data){
    //console.log(data);
    this.notify.info(data.data, {timeout:2000})
    setTimeout(1000);
    this.ngOnInit();
  }

  pause(id){
    this.formid.id = id;
    this.api.post('notice/pause', this.formid).subscribe(
      data => this.notifi(data),
      error => this.notify.error(error.error.error, {timeout:0})
    );
  }

  noticebyid(data){
    this.not = data[0];
    this.ed.title = this.not.title;
    this.ed.notice = this.not.notice;
    this.ed.role = this.not.role;
  }

  edit(id){
    this.formid.id = id;
    this.api.post('notice/getbyid', this.formid).subscribe(
      data => this.noticebyid(data),
      error => this.notify.error(error.error.error, {timeout:0})
    );

    var modal = document.getElementById('modal');
    modal.style.display = "block";
  }

  editsub(){
    this.close();
    this.ed.id = this.formid.id;
    //console.log(this.formid.id);
    this.api.post('notice/update', this.ed).subscribe(
      data => this.notifi(data),
      error => this.notify.error(error.error.error, {timeout:0})
    );
  }

  close(){
    var modal = document.getElementById('modal');
    modal.style.display = "none";
  }

  closeadd(){
    var modal = document.getElementById('modaladd');
    modal.style.display = "none";
  }

  delete(id){
    this.notify.confirm('Are you sure you want to detele this Notice?', 'Delete Notice', {
      timeout: 0,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      buttons: [
        {text: 'Yes', action: () => {this.formid.id = id;
          this.api.post('notice/delete', this.formid).subscribe(
            data => this.notifi(data),
            error => this.notify.error(error.error.error, {timeout:0})
          )}, bold: false},
        {text: 'No'}
      ]
    });
    setTimeout(2000);
    this.ngOnInit();
  }

  add(){
    this.eda.title = null;
    this.eda.notice = null;
    this.eda.role = null;

    var modal = document.getElementById('modaladd');
    modal.style.display = "block";
  }

  addnot(){
    this.closeadd();
    //console.log(this.formid.id);
    this.api.post('notice/add', this.eda).subscribe(
      data => this.notifi(data),
      error => this.notify.error(error.error.error, {timeout:0})
    );
  }
}
