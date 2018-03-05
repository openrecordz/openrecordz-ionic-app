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

// constants
import { TAG_NOTIFICATION_RECYCLING } from '../utils/Constants';

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

      this.initOneSignal(platform);
    });
  }

  private initOneSignal(platform) {
    if (!platform.is('core')) {
      this.oneSignal.startInit(MyApp.appConfig.oneSignalAppId, MyApp.appConfig.firebaseSenderId);

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

        // do something when notification is received
      this.oneSignal.handleNotificationReceived().subscribe((push) => {  
        console.log("MyApp.initOneSignal.handleNotificationReceived: push.payload == ", push.payload);
    
        if (push.payload.additionalData != undefined) {
          console.log("MyApp.initOneSignal.handleNotificationReceived: push.payload.additionalData == ", push.payload.additionalData);
          // let productId = push.payload.additionalData.id;
          // console.log('product Id ', productId)
        }

      });

      // do something when a notification is opened
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        console.log();
      });

      this.oneSignal.endInit();

      // console.log('*** sendTags::');
      // this.oneSignal.getTags()
      //   .then(tags => {
      //     // let jsonTags = JSON.stringify(tags);
      //     // console.log('Tags Received: ', jsonTags, jsonTags.length);
      //     // if (jsonTags.length <= 2) {
      //     //   this.oneSignal.sendTag(TAG_NOTIFICATION_RECYCLING, "true");
      //     // }
      //     console.log("tag", tags);

      //   })
      //   .catch((err) => {
      //     console.log('Unable to get tags.', err);
      //   });
    }
  }
}
