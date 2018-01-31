import { Component } from '@angular/core';
import { Platform, Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// pages
import { TabsPage } from '../pages/tabs/tabs';

// providers
import { LocationTrackerProvider } from '../providers/location-tracker';

@Component({
  templateUrl: 'app.html',
  providers: [LocationTrackerProvider]
})


export class MyApp {

  rootPage:any = TabsPage;

  public static currentLat: any;
  public static currentLon : any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public locationTracker: LocationTrackerProvider, public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.locationTracker = locationTracker;
      this.locationTracker.startTracking();

      // looks for last coordiantes
      this.events.subscribe('current-location', (lat, lon) => {
        // console.log('MyApp: lat: ', lat, ', lon: ', lon);

        MyApp.currentLat = lat;
        MyApp.currentLon = lon;

      });
    });
  }
}
