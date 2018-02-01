import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// pages
import { AboutPage } from '../pages/about/about';
import { CalendarPage } from '../pages/calendar/calendar';
import { DatasetsListPage } from '../pages/datasets-list/datasets-list';
import { TabsPage } from '../pages/tabs/tabs';
import { RecordsListPage } from '../pages/records-list/records-list';
import { RecordDetailsPage } from '../pages/record-details/record-details';
import { GoogleMapsPage } from '../pages/google-maps/google-maps';

// providers
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';
import { LocationTrackerProvider } from '../providers/location-tracker';
import { GoogleMapsClusterProvider } from '../providers/google-maps-cluster';
import { ConnectivityProvider } from '../providers/connectivity';
import { Network } from '@ionic-native/network';
import { DatasetService } from '../providers/dataset-service';
// import { RecordService } from '../providers/record-service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppVersion } from '@ionic-native/app-version';

// pipes
import { MomentPipe } from '../pipes/moment';

// custom configurations
import { APP_CONFIG_TOKEN, APP_CONFIG, ApplicationConfig } from '../app-config';

@NgModule({
  declarations: [
    MyApp,
    //pages
    AboutPage,
    CalendarPage,
    DatasetsListPage,
    TabsPage,
    RecordsListPage,
    RecordDetailsPage,
    GoogleMapsPage,
    // pipes
    MomentPipe,
  ],
  imports: [
    BrowserModule, HttpModule, // http
    BrowserModule,
    IonicModule.forRoot(MyApp
      // , 
      // {
      //   // urlApi: 'http://stefanotestopendata.api.openrecordz.com/service/v1',
      //   urlApi: 'http://soleto.api.openrecordz.com/service/v1',
      //   domain: 'soleto.openrecordz.com',
      // }
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    CalendarPage,
    DatasetsListPage,
    TabsPage,
    RecordsListPage,
    RecordDetailsPage,
    GoogleMapsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    // BackgroundGeolocation,
    LocationTrackerProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectivityProvider,
    GoogleMapsClusterProvider,
    Network,
    DatasetService,
    // RecordService,
    InAppBrowser,
    AppVersion,
    { provide: APP_CONFIG_TOKEN, useValue: APP_CONFIG }
  ]
})
export class AppModule {}
