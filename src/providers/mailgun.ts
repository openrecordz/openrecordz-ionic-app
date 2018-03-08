import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { MyApp } from "../app/app.component";
import { Events } from 'ionic-angular';

@Injectable()
export class MailgunProvider {

  private mailgunUrl: string;
  private mailgunApiKey: string;

  constructor(
    public http: Http,
    public events: Events) {
    // console.log('Hello MailgunProvider Provider');

    this.mailgunUrl = "https://api.mailgun.net/v3/" + MyApp.appConfig.mailgunUrl + "/messages";
    this.mailgunApiKey =  MyApp.appConfig.mailgunApiKey;
  }

  send(sender: string, recipient: string, subject: string, message: string) {

    var _authdata = btoa(this.mailgunApiKey); // convert to base&4 with ng native component

    // create headers
    let headers = new Headers(
      { 
        'Authorization': 'Basic ' + _authdata,
       }
    );
    let options = new RequestOptions(
      { headers: headers }
    );

    const formData = new FormData();
    formData.append('from', recipient);
    formData.append('to', recipient);
    formData.append('subject', subject);
    formData.append('html', message);
    // formData.append('attachment', attachment, 'report.txt');

    // return new Promise(resolve => {
    //   // We're using Angular HTTP provider to request the data,
    //   // then on the response, it'll map the JSON data to a parsed JS object.
    //   // Next, we process the data and resolve the promise with the new data.
    //   this.http.post(this.mailgunUrl, formData, options)
    //     .map(res => res.json())
    //     .subscribe(response => {
    //       console.log("SUCCESS - BEGIN");
    //       console.log(response);
    //       console.log("SUCCESS - END");
    //       resolve(response);
    //     }
    //     // ,error => {
    //     //   console.log("ERROR- BEGIN");
    //     //   // console.log(error);
    //     //   rejected(new Error(error));
    //     //   console.log("ERROR - END");
    //     // }
    //   );
    // });

    this.http.post(this.mailgunUrl, formData, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log('response', data);
        console.log("email sent");
        this.events.publish('email-sent:true', data);
      }, err => {
        console.log("email not sent");
        this.events.publish('email-sent:false', err); 
      }
    );
  }
}
