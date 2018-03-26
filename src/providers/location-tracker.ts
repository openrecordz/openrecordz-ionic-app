// import { Injectable, NgZone } from '@angular/core';
// import { Geolocation, Geoposition } from '@ionic-native/geolocation';
// import 'rxjs/add/operator/filter';
// import { Events } from 'ionic-angular';
// import { MyApp } from '../app/app.component';

// // source: 
// // https://www.joshmorony.com/adding-background-geolocation-to-an-ionic-2-application/

// @Injectable()
// export class LocationTrackerProvider {

//   public watch: any;
//   public lat: number = 0;
//   public lng: number = 0;

//   constructor(public zone: NgZone, public geolocation: Geolocation , public events: Events) {
//     // console.log('LocationTrackerProvider Provider');
    
//   }

//   startTracking() {
//     // Foreground Tracking

//     let options = {
//       frequency: 10000, // update every 10 seconds
//       enableHighAccuracy: true
//     };

//     this.watch = this.geolocation
//     .watchPosition(options)
//     .filter((p: any) => p.code === undefined)
//     .subscribe((position: Geoposition) => {

//       // console.log(position);

//       // Run update inside of Angular's zone
//       this.zone.run(() => {
//         this.lat = position.coords.latitude;
//         this.lng = position.coords.longitude;

//         MyApp.currentLat = this.lat;
//         MyApp.currentLon = this.lng;

//         // console.log('ForegroundGeolocation:  ' + this.lat + ',' + this.lng);

//         this.events.publish('current-location', this.lat, this.lng); 
//       });

//     });

//   }

//   stopTracking() {

//     // console.log('stopTracking');
//     this.watch.unsubscribe();

//   }

// }
