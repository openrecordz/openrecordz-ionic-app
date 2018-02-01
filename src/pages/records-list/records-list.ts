import { Component, Inject } from '@angular/core';
import {NavController, NavParams, /*Config, */Events } from 'ionic-angular';
import { RecordService } from '../../providers/record-service';

// pages
import { RecordDetailsPage } from '../record-details/record-details';
import { GoogleMapsPage } from '../google-maps/google-maps';

// context
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the RecordsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-records-list',
  templateUrl: 'records-list.html',
  providers: [RecordService]
})
export class RecordsListPage {

  private dataset: any;
  private domain: String;
  private records: any = [];
  private currentPage: number = 0;
  private pageSize: number = 10;
  private showMapWithInToolbar : false;

  constructor(public navCtrl: NavController, public navParams: NavParams, /*config: Config, */
    public recordService: RecordService, public events: Events) {
    this.dataset = navParams.get('dataset');
    // this.domain = config.get("domain");
    this.domain = MyApp.appConfig.domain;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RecordsListPage');

    this.events.subscribe('show-map-within-toolbar', (showMapWithInToolbar) => {
      console.log('ionViewDidLoad.subscribe: showMapWithInToolbar: ', showMapWithInToolbar);

      this.showMapWithInToolbar = showMapWithInToolbar;
    });

    this.loadRecord(this.dataset.id);
  }

  // Runs when the page is about to be destroyed and have its elements removed.
  ionViewWillUnload() {
    this.events.unsubscribe('show-map-within-toolbar');

    console.log('ionViewWillUnload.unsubscribe');
  } 

  loadRecord(datasetId) {
    this.recordService.load(datasetId)
      .then(data => {
        this.records = data;

        // console.log(this.records);
      });
  }

  onRecordClicked(record) {
    // console.log(record.id + " selected");

    var title = record.id;


    this.navCtrl.push(RecordDetailsPage,
      { record: record, title: title}
    );
  }

  onToolbarMapClick() {
    // console.log("record-list.onToolbarMapClick");
    
    this.navCtrl.push(GoogleMapsPage,
      { dataset: this.dataset }
    );
  }

  doInfinite(infiniteScroll) {
    // console.log('Begin async operation');
    this.currentPage++;
    this.recordService.load(this.dataset.id, this.currentPage, this.pageSize)
      .then(data => {
        /* this.records = data;*/
        let dataAsArray: any = data;
        for (let record of dataAsArray) {
          this.records.push(record);
        }

        // resolve(true);

        infiniteScroll.complete();
      });
  }

}
