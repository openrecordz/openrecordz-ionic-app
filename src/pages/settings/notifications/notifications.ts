import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
import { Storage } from '@ionic/storage';
import { TAG_NOTIFICATION_RECYCLING } from '../../../utils/Constants';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  // true if the notification is enabled, false otherwise.
  private notificationSetting: boolean = false; // false by default

  private tagsStatus : any = {};
  private tags: any =  [];
  private tagsName : any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform,
    private oneSignal: OneSignal,
    private storage: Storage) {

    // retrieve the value of setting notification from storage
    this.storage.get('setting-notification').then((val) => {
      console.log('notification settings is ', val);

      this.notificationSetting = val;
    });
    
    this.tags = [TAG_NOTIFICATION_RECYCLING]; // @TODO add other tags 
    this.initTagsNames(this.tags);

    if (this.platform.is('cordova')) {
      console.log('I am an cordova!');
      this.getTagsValues();
    }
  }

  // display name for the selected tag
  private initTagsNames(tags) {
    for (let index = 0; index < tags.length; index++) {
      const tag = tags[index];

      if (tag === TAG_NOTIFICATION_RECYCLING) {
        this.tagsName[index] = "Raccolta Differenziata" // @TODO add support for multi language
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  private enablePush(event) {
    var toggleValue = event.checked;
    console.log("enablePush", toggleValue);

    if (!this.platform.is('core')) {
      this.oneSignal.setSubscription(toggleValue);

      this.notificationSetting = toggleValue;

      // if false disable all settings
      if (!toggleValue) {
        this.disableAllSettings();
      }

      // update the setting value on storage
      this.storage.set('setting-notification', toggleValue);
    }
  }

  private getTagsValues() {
    console.log(' +++ GET TAG VALUES ', this.tagsStatus);
    this.oneSignal.getTags()
      .then(tags => {
        let tagsStr = JSON.stringify(tags);
        //console.log("tagsStr", tagsStr);
        JSON.parse(tagsStr, (key, value) => {
          this.tagsStatus[key] = value;
        });
        console.log("tagsStatus", this.tagsStatus);
      });
  }

  private setTagsValues(event, key) {
    this.tagsStatus[key] = event.value;
    console.log("key:::status", event.value, key, this.tagsStatus[key]);
    if (this.platform.is('cordova')) {
      this.oneSignal.sendTag(key, "'" + event.value + "'");
      console.log('send tag value ', event.value)
    }
  }

  private disableAllSettings() {
    this.mapObject(this.tagsStatus).forEach(tagStatus => {
      console.log("disableAllSettings.tagStatus", tagStatus)
    });
  }

  private mapObject(obj) {
    return Object.keys(obj).map(function (k) { return obj[k] });
  }
}
