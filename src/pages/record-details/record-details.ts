import { Component } from '@angular/core';
import { NavController, NavParams, Events} from 'ionic-angular';

// context
import { MyApp } from '../../app/app.component';

// providers
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the RecordDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-record-details',
  templateUrl: 'record-details.html',
})
export class RecordDetailsPage {

  private pageTitle: String;
  private record: any;

  // record location
  private recordLat : any;
  private recordLon: any;

  // current location
  private currentLat : any;
  private currentLon : any;

  private keys: any;

  private clickableMapUrl : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public iab: InAppBrowser) {
    this.pageTitle = navParams.get('title');
    this.record = navParams.get('record');
  }

  // Runs when the page has loaded. 
  // This event only happens once per page being created. 
  // If a page leaves but is cached, then this event will not fire again on a subsequent viewing.
  // The ionViewDidLoad event is good place to put your setup code for the page.
  ionViewDidLoad() {
    // console.log('ionViewDidLoad');

    this.currentLat =  MyApp.currentLat;
    this.currentLon = MyApp.currentLon ;
    // console.log('ionViewDidLoad: MyApp.currentLat: ', this.currentLat, ', MyApp.currentLon: ', this.currentLon);

    // update url
    this.upsetClickableMapUrl(this.currentLat, this.currentLon);

    // looks for last coordiantes
    this.events.subscribe('current-location', (lat, lon) => {
      console.log('ionViewDidLoad.subscribe: currentLat: ', lat, ', currentLon: ', lon);

      this.currentLat = lat;
      this.currentLon = lon;

      // update url
      this.upsetClickableMapUrl(this.currentLat, this.currentLon);

    });

    this.keys = Object.keys(this.record);

    // record coordinates
    this.setRecordCoordiantes();

    // excludes mapped datas
    this.excludeReservedData();

    // create a static map url
    this.getStaticMapUrl();
  }

  // Runs when the page is about to be destroyed and have its elements removed.
  ionViewWillUnload() {
    this.events.unsubscribe('current-location');

    console.log('ionViewWillUnload.unsubscribe');
  } 

  // set recordLat and recordLon
  private setRecordCoordiantes() {
    // console.log(this.record);

    // normalize lat if exists
    if (this.record._latitude) {
      // console.log("record._latitude");
      this.recordLat = this.normalizeCoordinate(this.record._latitude);
    }

    // normalize lon if exists
    if (this.record._longitude) {
      // console.log("record._longitude");
      this.recordLon = this.normalizeCoordinate(this.record._longitude);
    }

    // if exixts location, prefear it instead of record._latitude and record._longitude
    if (this.record._location) {
      var recordLocationLat = this.record._location[0];
      if (recordLocationLat) {
        // console.log("record.recordLocationLat");
        this.recordLat = this.normalizeCoordinate(recordLocationLat);
      }
    }

    // if exixts location, prefear it instead of record._latitude and record._longitude
    if (this.record._location) {
      var recordLocationLon = this.record._location[1];
      if (recordLocationLon) {
        // console.log("record.recordLocationLon");
        this.recordLon = this.normalizeCoordinate(recordLocationLon);
      }
    }
  }

  // replace each "," with "."
  private normalizeCoordinate(coordinate) {
    var strCoordinate = String(coordinate);

    if (strCoordinate.indexOf(',') > -1) {
      coordinate = strCoordinate.replace(",", ".");
    }
      
    // console.log(coordinate);
    return parseFloat(coordinate);
  }

  // remove reserved data wich start with "_" from visible custom data
  private excludeReservedData() {
    var excludedKeys = Array();
    this.keys.forEach(function (key) {
      if (key !== 'id' && !key.startsWith('_')) {
        excludedKeys[key] = key;
      }
    });
    this.keys = Object.keys(excludedKeys);
  }

  // generate a static map url from record lat and lon
  private getStaticMapUrl() {

    if (this.recordLat && this.recordLon) {
      var zoom = 13;
      var width = 640;
      var height = 250;
      var scale = 2;
      var type = "roadmap";
      var markerColor = "red";

      var url = "https://maps.googleapis.com/maps/api/staticmap" +
        "?center=" + this.recordLat + "," + this.recordLon +
        "&zoom=" + zoom +
        "&size=" + width + "x" + height +
        "&scale=" + scale +
        "&maptype=" + type +
        "&markers=color:" + markerColor + "%7C" + this.recordLat + "," + this.recordLon;

      this.record["map_url"] = url;
    }
  }

  private upsetClickableMapUrl(currentLat, currentLon) {
    this.clickableMapUrl = "https://www.google.com/maps/dir/?api=1&origin=" + currentLat + "," + currentLon + "&destination=" + this.recordLat + "," + this.recordLon + "&travelmode=walking";
  }

  private onMapClicked() {
    // console.log("RecordDetailsPage.onMapClicked");
    // console.log("RecordDetailsPage.onMapClicked: this.currentLat == " + this.currentLat);
    // console.log("RecordDetailsPage.onMapClicked: this.currentLon == " + this.currentLon);
    // console.log("RecordDetailsPage.onMapClicked: this.recordLat == " + this.recordLat);
    // console.log("RecordDetailsPage.onMapClicked: this.recordLon == " + this.recordLon);

    this.iab.create(this.clickableMapUrl, "_system");
    // const browser = this.iab.create(this.clickableMapUrl, "_system");
    // browser.show()
  }
}