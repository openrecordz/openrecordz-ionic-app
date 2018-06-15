import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events} from 'ionic-angular';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

// context
import { MyApp } from '../app/app.component';

@Injectable()
export class RecordService {

  //data: any;
  urlApi: String;

    constructor(public http: Http, public events: Events) {
    console.log('RecordService Provider');
    // console.log("urlApi : "+ this.urlApi);

    this.urlApi = MyApp.appConfig.urlApi;
  }

load(datasetId:String, page:number=0, pageSize:number=20, direction:String="desc") {

    this.http.get(this.urlApi + '/datasets/' + datasetId + '?page=' + 0 + "&pagesize=" + pageSize)
        .map(res => res.json())
        .subscribe(data => {
            // we've got back the raw data, now generate the core schedule data
            // and save the data for later reference
            //  this.data = data;
            //resolve(this.data);

            // console.log("loaded records: ", data);

            if (data.length > 0) {
                for (let element of data) {

                    // console.log("RecordService.element._location:  ", element._location );
                    // console.log("RecordService.element._latitude: ", element._latitude);
                    // console.log("RecordService.element._longitude: ", element._longitude);

                    if ((element._location && element._location[0] && element._location[1]) || (element._latitude && element._longitude)) {
                        this.events.publish('show-map-within-toolbar', true); 
                        break; // at least 1 item has coordinates. stop the iteration
                    }
                };
            } else {
                this.events.publish('show-map-within-toolbar', false); 
            }
           

            /*   this.data = this.applyHaversine(data);
               */

        });

  // don't have the data yet
  return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
      this.http.get(this.urlApi + '/datasets/' + datasetId + '?page=' + page + "&type=record&sort=_createdon&direction=" + direction)
    //   this.http.get(this.urlApi + '/datasets/' + datasetId + ".map?q=&page=" + page + "&pagesize=" + pageSize + "&type=record&sort=_createdon&direction=desc")
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
      //  this.data = data;
      //resolve(this.data);

      resolve(data);

     /*   this.data = this.applyHaversine(data);
        */

      });
  });
}

//https://www.joshmorony.com/create-a-nearby-places-list-with-google-maps-in-ionic-2-part-2/
applyHaversine(locations){

        let usersLocation = {
            lat: 40.713744,
            lng: -74.009056
        };

        locations.map((location) => {

            let placeLocation = {
                lat: location.latitude,
                lng: location.longitude
            };

            location.distance = this.getDistanceBetweenPoints(
                usersLocation,
                placeLocation,
                'miles'
            ).toFixed(2);
        });

        return locations;
    }

     getDistanceBetweenPoints(start, end, units){

        let earthRadius = {
            miles: 3958.8,
            km: 6371
        };

        let R = earthRadius[units || 'miles'];
        let lat1 = start.lat;
        let lon1 = start.lng;
        let lat2 = end.lat;
        let lon2 = end.lng;

        let dLat = this.toRad((lat2 - lat1));
        let dLon = this.toRad((lon2 - lon1));
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;

        return d;

    }

    toRad(x){
        return x * Math.PI / 180;
    }








    loadCalendar(datasetId:String, page:number=0, pageSize:number=20) {

        var currentDay = moment(new Date()).format("YYYY-MM-DD")

        var query = '{"when_d":{$gte:{"$date":"' + currentDay + 'T00:00:00.000Z"}}}';
        query = 'q='+  encodeURI(query);
        console.log("query", query);
        
        var urlAPI = this.urlApi + '/datasets/' + datasetId + '?'+query+'&page=' + page + '&pagesize=' + pageSize;
        // var urlAPI = this.urlApi + '/datasets/' + datasetId + '?q={"when_d":{$gte:{"$date":"' + currentDay + 'T00:00:00.000Z"}}}&page=' + page + '&pagesize=' + pageSize;

        // this.http.get(calendarUrlAPI)
        this.http.get(urlAPI)
            .map(res => res.json())
            .subscribe(data => {
                // we've got back the raw data, now generate the core schedule data
                // and save the data for later reference
                //  this.data = data;
                //resolve(this.data);

                // console.log("loaded records: ", data);

                if (data.length > 0) {
                    for (let element of data) {

                        // console.log("RecordService.element._location:  ", element._location );
                        // console.log("RecordService.element._latitude: ", element._latitude);
                        // console.log("RecordService.element._longitude: ", element._longitude);

                        if ((element._location && element._location[0] && element._location[1]) || (element._latitude && element._longitude)) {
                            this.events.publish('show-map-within-toolbar', true); 
                            break; // at least 1 item has coordinates. stop the iteration
                        }
                    };
                } else {
                    this.events.publish('show-map-within-toolbar', false); 
                }
            

                /*   this.data = this.applyHaversine(data);
                */

            });

        // don't have the data yet
        return new Promise(resolve => {
            // We're using Angular HTTP provider to request the data,
            // then on the response, it'll map the JSON data to a parsed JS object.
            // Next, we process the data and resolve the promise with the new data.
            this.http.get(urlAPI)
            .map(res => res.json())
            .subscribe(data => {
                // we've got back the raw data, now generate the core schedule data
                // and save the data for later reference
            //  this.data = data;
            //resolve(this.data);

            // console.log(data);

            resolve(data);

            /*   this.data = this.applyHaversine(data);
                */

            });
        });
    }
}