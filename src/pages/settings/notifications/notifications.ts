import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  // true if the notification is enabled, false otherwise.
  private notificationSetting: boolean = false; // false by default

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform,
    private oneSignal: OneSignal,
    private storage: Storage
   ) {

    // retrieve the value of setting notification from storage
    this.storage.get('setting-notification').then((val) => {
      console.log('notification settings is ', val);

      this.notificationSetting = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  private enablePush(event) {
    var toggleValue = event.checked;
    console.log("enablePush", toggleValue);

    if (!this.platform.is('core')) {
      this.oneSignal.setSubscription(toggleValue);

      // update the setting value on storage
      this.storage.set('setting-notification', toggleValue);

      this.notificationSetting = toggleValue;
    }
  }

}
