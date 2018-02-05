import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams, Events} from 'ionic-angular';

import { Loading, LoadingController } from 'ionic-angular';

// context
import { MyApp } from '../../app/app.component';

// providers
import { GoogleMapsClusterProvider } from '../../providers/google-maps-cluster';
import { ConnectivityProvider } from '../../providers/connectivity';

import { RecordService } from '../../providers/record-service';

/**
 * Generated class for the GoogleMapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@Component({
  selector: 'page-google-maps',
  templateUrl: 'google-maps.html',
  providers: [RecordService],
})
export class GoogleMapsPage {

  private dataset: any;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mapInitialised: boolean = false;
  apiKey: any;

  // current location
  private currentLat: any;
  private currentLon: any;

  public records: any;
  private recordsLoaded = false;
  private markers = [];//some array
  private loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public connectivityService: ConnectivityProvider,
    public mapCluster: GoogleMapsClusterProvider, public events: Events, public recordService: RecordService, loadingController: LoadingController) {
    this.dataset = navParams.get('dataset');

    // create loading spinner
    this.loading = loadingController.create({
      content: 'Caricamento in corso..'
    });

    this.loading.present(); // show loading spinner
  }

  ionViewDidLoad() {
    this.currentLat = MyApp.currentLat;
    this.currentLon = MyApp.currentLon;
    // console.log('ionViewDidLoad: MyApp.currentLat: ', this.currentLat, ', MyApp.currentLon: ', this.currentLon);

    // looks for last coordiantes
    this.events.subscribe('current-location', (lat, lon) => {
      // console.log('ionViewDidLoad.subscribe: currentLat: ', lat, ', currentLon: ', lon);

      this.currentLat = lat;
      this.currentLon = lon;

    });

    this.loadGoogleMaps();
  }

  loadGoogleMaps() {

    this.addConnectivityListeners();

    if (typeof google == "undefined" || typeof google.maps == "undefined") {

      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();

      if (this.connectivityService.isOnline()) {
        console.log("online, loading map");

        //Load the SDK
        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }

        document.body.appendChild(script);

      }
    } else {
      if (this.connectivityService.isOnline()) {
        console.log("showing map");
        this.initMap();
        this.enableMap();
      }  else {
        console.log("disabling map");
        this.disableMap();
      }
    }
  }

  initMap() {

    this.mapInitialised = true;

      let latLng = new google.maps.LatLng(this.currentLat, this.currentLon);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

  disableMap() {
    console.log("disable map");
  }

  enableMap() {
    console.log("enable map");

    // this.loadMarkersCluster();

    this.loadRecords();
  }

  loadRecords() {
    console.log('GoogleMapsPage.loadRecord');

    this.recordService.load(this.dataset.id)
      .then(data => {
        this.recordsLoaded = true;
        console.log("recordsLoaded ", this.recordsLoaded);
        this.records = data;

        //  console.log("adding markers");
        for (let record of this.records) {
          // console.log(record);

          if (record._location) {
            // is valid location
            var lat = record._location[0];
            var lon = record._location[1];

          } else if (record._latitude && record._longitude) {
            // are valid lat / lon

            // format lat
            if (record._latitude.indexOf(',') > -1) {
              lat = record._latitude.replace(",", ".");
            }

            // format lon
            if (record._longitude.indexOf(',') > -1) {
              lon = record._longitude.replace(",", ".");
            }
          }

          // add markers to map
          if (lat && lon) {
            // console.log(parseFloat(lat) + " - " + parseFloat(lon));
            this.createMarker(record._title, parseFloat(lat), parseFloat(lon));
          }
        }

        // there are not markers
        if (this.markers.length > 0) {
          this.addMarkersToMap();
        } 

        this.loading.dismiss(); // dismiss loading spinner
      });
  }

  createMarker(title, lat, lon) {
    // console.log("GoogleMapsPage.createMarker");
    // console.log("GoogleMapsPage.createMarker: title == " + title + ", lat == " + lat + ", lon == " + lon);
    //let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    let latLng = new google.maps.LatLng(lat, lon);
    //this.bounds.extend(latLng);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    let content = "<h4>" + title + "</h4>";

    this.addInfoWindow(marker, content);

    this.markers.push(marker);

  }

  addInfoWindow(marker, content) {
    // console.log("GoogleMapsPage.addInfoWindow");

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  addMarkersToMap() {
    console.log("GoogleMapsPage.addMarkersToMap");

    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < this.markers.length; i++) {
      bounds.extend(this.markers[i].getPosition());
    }

    this.map.fitBounds(bounds);
  }

  // private loadMarkersCluster() {
     // this.mapCluster.setDataset(this.dataset.id);
    // this.mapCluster.load();
    // this.mapCluster.addCluster(this.map);
  // }

  addConnectivityListeners() {

    let onOnline = () => {

      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {

          this.loadGoogleMaps();

        } else {

          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }
      }, 2000);

    };

    let onOffline = () => {
      this.disableMap();
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);

  }
}