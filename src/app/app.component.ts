import { Component, Inject} from '@angular/core';
import { Platform, Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// pages
import { TabsPage } from '../pages/tabs/tabs';

// providers
import { LocationTrackerProvider } from '../providers/location-tracker';
import { OneSignal } from '@ionic-native/onesignal';

// custom configurations
import { APP_CONFIG_TOKEN, APP_CONFIG, ApplicationConfig } from '../app-config';

@Component({
  templateUrl: 'app.html',
  providers: [LocationTrackerProvider]
})


export class MyApp {

  rootPage:any = TabsPage;

  public static currentLat: any;
  public static currentLon : any;
  public static appConfig: ApplicationConfig;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public locationTracker: LocationTrackerProvider, 
    public events: Events, 
    private oneSignal: OneSignal,
    @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig) {

    MyApp.appConfig = config;


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

      this.initOneSignal();
    });
  }

  private initOneSignal() {
    this.oneSignal.startInit(MyApp.appConfig.oneSignalAppId, MyApp.appConfig.firebaseSenderId);

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
      console.log();
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
      console.log();
    });

    this.oneSignal.endInit();
  }
}
