import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from 'ionic-angular';


/*
  Generated class for the RecordService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DatasetService {

  datasets: any;
  urlApi: String;

  constructor(public http: Http, config: Config) {
    // console.log('DatasetService Provider');
    //http://mcgivery.com/understanding-ionic-2-app/
    //https://ionicframework.com/docs/v2/api/config/Config/
    this.urlApi=config.get("urlApi");
    // console.log("urlApi : "+ this.urlApi);
  }

load() {
 // if (this.datasets) {
    // already loaded datasets
 //   return Promise.resolve(this.datasets);
  //}

  // don't have the data yet
  return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
	this.http.get(this.urlApi+'/datasets')
      .map(res => res.json())
      .subscribe(datasets => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.datasets = datasets;
        resolve(this.datasets);
      });
  });
}


}
