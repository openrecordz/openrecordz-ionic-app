import { Component} from '@angular/core';
import { NavController, Platform} from 'ionic-angular';

// providers
import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TranslateService } from '@ngx-translate/core';
import { OneSignal } from '@ionic-native/onesignal';
import { Storage } from '@ionic/storage';

// context
import { MyApp } from '../../app/app.component';

// pages
import { NotificationsPage } from '../settings/notifications/notifications';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  private developer: String;
  private domain: String;
  private devWebSite : string;
  private aboutMap : Array<any>;

  private versionNumber : any;
  // private versionCode : any;
  private appName : any;

  constructor(
    public navCtrl: NavController,
    private platform: Platform, 
    public appVersion: AppVersion,
    private iab: InAppBrowser,
    private translate: TranslateService,
    private oneSignal: OneSignal) {
      this.developer = MyApp.appConfig.developer;

      // ########### begin translations ###########
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang(MyApp.appConfig.defaultLanguage);
      translate.use(MyApp.appConfig.defaultLanguage)
      // ########### end translations ###########

      this.domain = MyApp.appConfig.domain;
      this.devWebSite = MyApp.appConfig.devWebSite;
      this.aboutMap = MyApp.appConfig.aboutMap;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');

    if (!this.platform.is('core')) {
      // console.log("platform is not core");    

      // get the version number
      this.appVersion.getVersionNumber().then(versionNumber => {
        console.log('VERSION NUMBER ', versionNumber);
        this.versionNumber = versionNumber;
      });

      // // get the version code
      // this.appVersion.getVersionCode().then(versionCode => {
      //   console.log('VERSION CODE ', versionCode);
      //   this.versionCode = versionCode;
      // });

      // get the app name
      this.appVersion.getAppName().then(appName => {
        console.log('APP NAME ', appName);
        this.appName = appName;
      });
    }
  }

  openUrl(url) {
    this.iab.create(url, "_system");
  } 

  private onNotificationSettingsClick() {
    this.openNotificationPage();
  }

  private openNotificationPage() {
    this.navCtrl.push(NotificationsPage
    );
  }
}
