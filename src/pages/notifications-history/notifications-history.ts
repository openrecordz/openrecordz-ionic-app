import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// providers
import { NotificationHistoryProvider } from '../../providers/notification-history';

/**
 * Generated class for the NotificationsHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notifications-history',
  templateUrl: 'notifications-history.html',
  providers: [NotificationHistoryProvider]
})
export class NotificationsHistoryPage {

  private notifications: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public notificationHistoryProvider: NotificationHistoryProvider
  ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NotificationsHistoryPage');

    var limit = 50; // default and max of onesignal
    var offset = 0; // default of onesignal

    this.loadNotifications(limit, offset);

  }

  private loadNotifications(limit, offset) {
    this.notificationHistoryProvider.load(limit, offset)
      .then(notifications => {
        // console.log("notifications", notifications);
        this.notifications = notifications['notifications'];
        console.log("notifications", this.notifications);
      });
  }

}
