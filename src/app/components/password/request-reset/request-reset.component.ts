import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public form = {
    email : null
  };

  public error = null;

  constructor(
    private api : ApiService,
    private notify : SnotifyService
    ) {}

  ngOnInit() {
  }

  onSubmit(){
    this.notify.info('Wait...', {timeout:5000});
    return this.api.post('sendPasswordReset', this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error, {timeout:0})
    );
  }

  handleResponse(data){
    this.notify.info(data.data, {timeout:0});
    this.form.email = null;
  }

}
