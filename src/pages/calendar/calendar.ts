import { Component } from '@angular/core';
import { NavController, Config } from 'ionic-angular';

// providers
import { RecordService } from '../../providers/record-service';

// pages
import {RecordDetailsPage} from '../record-details/record-details'

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
  providers: [RecordService],
})
export class CalendarPage {

  private datasetId: String;
  private domain: String;

  private records: any = [];
  private currentPage: number = 0;

  constructor(public navCtrl: NavController, private config: Config, private recordService: RecordService) {
    this.datasetId = "5a70b3bde4b0f940ec4ed6df";
    this.domain = this.config.get("domain");
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CalendarRecordsListPage');
    this.loadRecords(this.datasetId);
  }

  loadRecords(datasetId) {
    this.recordService.load(datasetId)
      .then(data => {
        // records retrieved 
        this.records = data;
        
        // this.records.forEach(element => {
        //   console.log(element.when);
        // });
      });
  }


  onClick(record) {
    // console.log("record clicked: ");
    // console.log(record);
    this.navCtrl.push(RecordDetailsPage,
      { record: record }
    );
  }

  doInfinite(infiniteScroll) {
    // console.log('Begin async operation');
    this.currentPage++;
    // this.recordService.load(this.dataset.id, this.currentPage)
    this.recordService.load(this.datasetId, this.currentPage)
      .then(data => {
        /* this.records = data;*/
        let dataAsArray: any = data;
        for (let record of dataAsArray) {
          this.records.push(record);
        }

        // console.log("infiniteScroll records:");
        // console.log(this.records);

        // resolve(true);

        infiniteScroll.complete();
      });
  }
}
