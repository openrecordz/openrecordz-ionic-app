import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// providers
import { RecordService } from '../../providers/record-service';
import { TranslateService } from '@ngx-translate/core';
import { DatasetService } from '../../providers/dataset-service';

// pages
import {RecordDetailsPage} from '../record-details/record-details'
import { RecordsListPage } from '../records-list/records-list';

// context
import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
  providers: [RecordService],
})
export class CalendarPage {

  private datasetId: String;
  private domain: String;

  private datasetGlossaryId: String;
  private datasetGlossary : any;

  private records: any = [];
  private currentPage: number = 0;

  constructor(
    public navCtrl: NavController,
    private recordService: RecordService,
    private datasetService: DatasetService,
    private translate: TranslateService) {

    // ########### begin translations ###########
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(MyApp.appConfig.defaultLanguage);
    translate.use(MyApp.appConfig.defaultLanguage)
    // ########### end translations ###########

    this.datasetId = "5a70b3bde4b0f940ec4ed6df";
    this.datasetGlossaryId = "5a79e3bee4b0f940ec4ed90c";
    this.domain = MyApp.appConfig.domain;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CalendarRecordsListPage');
    this.loadDatasetGlossary(this.datasetGlossaryId);
    this.loadRecords(this.datasetId);
  }

  private loadDatasetGlossary(datasetId) {
    this.datasetService.loadById(datasetId)
      .then(dataset => {
        // console.log("dataset", dataset);
        this.datasetGlossary = dataset;
      });
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

  private onToolbarGloassaryClick() {
    // console.log("onToolbarGloassaryClick");
  
    this.navCtrl.push(RecordsListPage,
      { dataset: this.datasetGlossary }
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
