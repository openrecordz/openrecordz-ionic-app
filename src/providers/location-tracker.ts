import { Injectable, NgZone } from '@angular/core';
// import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { Events } from 'ionic-angular';
import { MyApp } from '../app/app.component';

// tutorial: 
// https://www.joshmorony.com/adding-background-geolocation-to-an-ionic-2-application/

/*
  Generated class for the LocationTrackerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationTrackerProvider {

  // private backgroundGeolocation: BackgroundGeolocation;

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;

  constructor(public zone: NgZone/*, backgroundGeolocation: BackgroundGeolocation*/, public geolocation: Geolocation , public events: Events) {
    // console.log('LocationTrackerProvider Provider');
    
    // this.backgroundGeolocation = backgroundGeolocation;
  }

  startTracking() {

    // // Background Tracking

    // let config = {
    //   desiredAccuracy: 0,
    //   stationaryRadius: 20,
    //   distanceFilter: 10,
    //   debug: true,
    //   interval: 3000
    // };

    // this.backgroundGeolocation.configure(config).subscribe((location) => {

    //   // console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

    //   // Run update inside of Angular's zone
    //   this.zone.run(() => {
    //     this.lat = location.latitude;
    //     this.lng = location.longitude;

    //     MyApp.currentLat = this.lat ;
    //     MyApp.currentLon = this.lng;

    //     console.log('BackgroundGeolocation:  ' + this.lat + ',' + this.lng);

    //     this.events.publish('current-location', this.lat, this.lng); 
    //   });

    // }, (err) => {

    //   console.log(err);

    // });

    // // Turn ON the background-geolocation system.
    // this.backgroundGeolocation.start();


    // Foreground Tracking

    let options = {
      frequency: 10000, // update every 10 seconds
      enableHighAccuracy: true
    };

    this.watch = this.geolocation
    .watchPosition(options)
    .filter((p: any) => p.code === undefined)
    .subscribe((position: Geoposition) => {

      // console.log(position);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        MyApp.currentLat = this.lat;
        MyApp.currentLon = this.lng;

        // console.log('ForegroundGeolocation:  ' + this.lat + ',' + this.lng);

        this.events.publish('current-location', this.lat, this.lng); 
      });

    });

  }

  stopTracking() {

    // console.log('stopTracking');

    // this.backgroundGeolocation.finish();
    this.watch.unsubscribe();

  }

}
