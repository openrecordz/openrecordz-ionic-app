import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { MyApp } from '../app/app.component';

/*
 * Created by stefanodp91 on 18/02/2018
 */
@Injectable()
export class NotificationHistoryProvider {

  private oneSignalAppId: String; // REQUIRED The app ID that you want to view notifications from
  private oneSignalRestApiKey: String;  // REQUIRED basic auth 

  private notifications : any;

  constructor(
    public http: Http
  ) {
    this.oneSignalAppId = MyApp.appConfig.oneSignalAppId;
    this.oneSignalRestApiKey = MyApp.appConfig.oneSignalRestApiKey;
  }

  /**
   * @param limit How many notifications to return. Max is 50. Default is 50
   * @param offset Result offset. Default is 0. Results are sorted by queued_at in descending order. 
  *                Queued_at is the unixtime representation of the time that the notification was queued.
   */
  // load(limit, offset) {
  load() {
    let headers = new Headers(
      { 'Authorization': 'Basic ' + this.oneSignalRestApiKey }
    );
    
    let options = new RequestOptions(
      { headers: headers }
    );

    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get('https://onesignal.com/api/v1/notifications?app_id=' + this.oneSignalAppId /*+ '&limit=' + limit + '&offset=' + offset*/, options)
        .map(res => res.json())
        .subscribe(notifications => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.notifications = notifications;
          // console.log(this.notifications);
          resolve(this.notifications);
        });
    });
  }
}
