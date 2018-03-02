import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

// providers
import { NotificationHistoryProvider } from '../../providers/notification-history';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TranslateService } from '@ngx-translate/core';

// context
import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-notifications-history',
  templateUrl: 'notifications-history.html',
  providers: [NotificationHistoryProvider]
})
export class NotificationsHistoryPage {

  private notifications: any;

  // private DEFAULT_LIMIT : number = 50;  // default and max of onesignal
  // private DEFAULT_OFFSET : number = 0; // default of onesignal

  private spinner : Loading;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private notificationHistoryProvider: NotificationHistoryProvider,
    private iab: InAppBrowser,
    private loadingCtrl: LoadingController,
    private translate: TranslateService,) {
      // ########### begin translations ###########
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang(MyApp.appConfig.defaultLanguage);
      translate.use(MyApp.appConfig.defaultLanguage)
      // ########### end translations ###########
      this.spinner = this.createSpinner();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NotificationsHistoryPage');

    // this.loadNotifications(null, this.DEFAULT_LIMIT, this.DEFAULT_OFFSET);

    this.loadNotifications(null);

  }

  // private loadNotifications(refresher, limit, offset) {
  //  this.notificationHistoryProvider.load(limit, offset)
  private loadNotifications(refresher) {
    this.showLoading();

    this.notificationHistoryProvider.load()
      .then(notifications => {
        // console.log("notifications", notifications);
        this.notifications = notifications['notifications'];
        // console.log("notifications", this.notifications);

        if(refresher !== undefined && refresher !== null) refresher.complete();

        this.dismisLoading();
        
      });
  }

  private onNotificationClick(notificationUrl) {
    if(notificationUrl) this.iab.create(notificationUrl, "_system");
  }

  private doRefresh(refresher) {
  //  this.loadNotifications(refresher, this.DEFAULT_LIMIT, this.DEFAULT_OFFSET);
    this.loadNotifications(refresher);
  }

  private createSpinner() {
    var message = this.translate.get('page_notifications_history_loading_message')['value'];

     var spinner = this.loadingCtrl.create({
      content: message,
      // duration: duration,
      dismissOnPageChange: true
    });
    return spinner;
  }

  private showLoading() {
    if(this.spinner) {
      this.spinner.present();
    }
  }

  private dismisLoading() {
    if(this.spinner) {
      this.spinner.dismiss;
    }
  }
}
