import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as MarkerClusterer from 'node-js-marker-clusterer';
import 'rxjs/add/operator/map';
import { Config, Events} from 'ionic-angular';


/*
  Generated class for the GoogleMapsClusterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoogleMapsClusterProvider {

  markerCluster: any;

  urlApi: String;
  datasetId : String;

  constructor(public http: Http, config: Config, public events: Events) {
    // console.log('GoogleMapsClusterProvider Provider');

    this.urlApi = config.get("urlApi");
    // console.log("GoogleMapsClusterProvider.constructor: urlApi == " + this.urlApi);
  }

  setDataset(datasetId: String) {
    this.datasetId = datasetId;
    // console.log("GoogleMapsClusterProvider.setDataset: datasetId == " + this.datasetId);
  }

  load() {
    // console.log("GoogleMapsClusterProvider.setDaload");

    this.http.get(this.urlApi + '/datasets/' + this.datasetId + '?page=' + 0 + "&pagesize=1000000")
      .map(res => res.json())
      .subscribe(data => {

        // console.log("GoogleMapsClusterProvider.setDaload: data == ", data);

        var locations = new Array();
     
        // setup records latitude and logitude
        if (data.length > 0) {
          for (let element of data) {
            if ((element._location && element._location[0] && element._location[1]) || (element._latitude && element._longitude)) {
              var lat : any;
              var lng : any;
              if (element._latitude && element._longitude) {
                lat = this.normalizeCoordinate(element._latitude);
                lng = this.normalizeCoordinate(element._longitude);
                locations.push({ lat: lat, lng: lng });
              } else if (element._location){
                if (element._location[0] && element._location[1]) {
                  lat = this.normalizeCoordinate(element._location[0]);
                  lng = this.normalizeCoordinate(element._location[1]);
                  locations.push({ lat: lat, lng: lng });
                }
              }
            }
          };
        } 

        // console.log("GoogleMapsClusterProvider.setDaload: locations == ", locations);
        this.events.publish('google-maps-cluster-locations', locations); 
      });
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

  addCluster(map) {
    // console.log("GoogleMapsClusterProvider.addCluster: map == ", map);

    this.events.subscribe('google-maps-cluster-locations', (locations) => {
      // console.log('GoogleMapsClusterProvider.addCluster.subscribe: locations: ', locations);

      if (google.maps) {

        //Convert locations into array of markers
        let markers = locations.map((location) => {
          return new google.maps.Marker({
            position: location,
            label: "Hello!",
          });
        });

        this.markerCluster = new MarkerClusterer(map, markers, { imagePath: 'assets/m/' });

      } else {
        console.warn('Google maps needs to be loaded before adding a cluster');
      }
    });
  }
}
