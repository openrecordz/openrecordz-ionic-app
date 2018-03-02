import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

// providers
import { DatasetService } from '../../providers/dataset-service';
import { TranslateService } from '@ngx-translate/core';

// pages
import { RecordsListPage } from '../records-list/records-list';
import { SearchPage } from '../search/search';
import { ReportPage } from '../report/report';

// context
import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-datasets-list',
  templateUrl: 'datasets-list.html',
  // providers: [DatasetService]
})
export class DatasetsListPage {

  private datasets: any;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private datasetService: DatasetService,
    private translate: TranslateService,
    private modalCtrl: ModalController) {

    // ########### begin translations ###########
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(MyApp.appConfig.defaultLanguage);
    translate.use(MyApp.appConfig.defaultLanguage)
    // ########### end translations ###########

    // this.loadDatasets();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DatasetsListPage');

    this.loadDatasets(null);
  }

  private loadDatasets(refresher) {

    this.datasetService.load()
      .then(datasets => {
        // console.log(datasets);
        this.datasets = datasets;

        if(refresher !== undefined && refresher !== null)   refresher.complete();
      });
  }

  private onDatasetClicked(dataset) {
    // console.log(dataset.id + " clicked");

    this.navCtrl.push(RecordsListPage,
      { dataset: dataset }
    );
  }

  private onToolbarSearchClick() {
    console.log("DatasetsListPage.onToolbarSearchClick");

    this.navCtrl.push(SearchPage,
      { criteria: "dataset" }
    );
  }

  private doRefresh(refresher) {
    this.loadDatasets(refresher);
  }

  private onSendReportClick() {
    console.log("DatasetsListPage.onSendReportClick");

    let contactModal = this.modalCtrl.create(ReportPage);
    contactModal.present();
  }
}