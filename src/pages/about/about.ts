import { Component, Inject} from '@angular/core';
import { NavController, Platform/*, Config*/} from 'ionic-angular';

// providers
import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';

// context
import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  private developer: String;
  private domain: String;
  private siteUrl : string;

  private versionNumber : any;
  private versionCode : any;
  private appName : any;

  constructor(public navCtrl: NavController, private platform: Platform, 
    public appVersion: AppVersion, private iab: InAppBrowser/*, private config: Config*/
  ) {
    this.developer = "Openrecordz";
    // this.appName = this.appVersion.getAppName();
    // this.packageName = this.appVersion.getPackageName();
    // this.versionCode = this.appVersion.getVersionCode();
    // this.versionNumber = this.appVersion.getVersionNumber();


    this.domain = MyApp.appConfig.domain;
    // this.domain = this.config.get("domain");
    // this.siteUrl = "http://" + this.domain + "/datasets#";
    this.siteUrl = MyApp.appConfig.webSite;
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

      // get the version code
      this.appVersion.getVersionCode().then(versionCode => {
        console.log('VERSION CODE ', versionCode);
        this.versionCode = versionCode;
      });

      // get the app name
      this.appVersion.getAppName().then(appName => {
        console.log('APP NAME ', appName);
        this.appName = appName;
      });
    }
    //  else {
    //   console.log("platform is core");
    // }
  }

  openUrl() {
    this.iab.create(this.siteUrl, "_system");
    // const browser = this.iab.create(this.siteUrl, "_system");
    // browser.show()
  } 
}
