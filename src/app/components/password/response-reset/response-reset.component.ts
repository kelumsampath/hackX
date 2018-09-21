import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { TokenService } from '../../../services/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public form = {
    email : null,
    password : null,
    password_confirmation : null,
    resetToken : null
  };

  constructor(
    private api : ApiService,
    private token : TokenService,
    private router : Router,
    private auth : AuthService,
    private notify: SnotifyService,
    private route : ActivatedRoute
  ) { 
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token'];
    })
  }

  ngOnInit() {
  }

  onSubmit(){
    return this.api.post('responsePasswordReset', this.form).subscribe(
      data => this.resetHandler(data),
      error => this.handleerror(error)
    );
  }

  handleerror(error){
    if(error.error.errors){
      if(error.error.errors.email)
        this.notify.error(error.error.errors.email, {timeout:0})
      if(error.error.errors.password)
        this.notify.error(error.error.errors.password, {timeout:0})
    }

    if(error.error.error)
        this.notify.error(error.error.error, {timeout:0})
  }

  resetHandler(data){
    this.notify.info(data.data, {timeout:2000});
    this.token.remove();
    this.router.navigateByUrl('/login');
  }

}
