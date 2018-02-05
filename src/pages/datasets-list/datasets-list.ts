import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// providers
import { DatasetService } from '../../providers/dataset-service';
import { TranslateService } from '@ngx-translate/core';

// pages
import { RecordsListPage } from '../records-list/records-list';
import { SearchPage } from '../search/search';

// context
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the DatasetsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-datasets-list',
  templateUrl: 'datasets-list.html',
  // providers: [DatasetService]
})
export class DatasetsListPage {

  private datasets: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public datasetService: DatasetService,
    translate: TranslateService) {

    // ########### begin translations ###########
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(MyApp.appConfig.defaultLanguage);
    translate.use(MyApp.appConfig.defaultLanguage)
    // ########### end translations ###########

    // this.loadDatasets();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DatasetsListPage');

    this.loadDatasets();
  }

  private loadDatasets() {
    this.datasetService.load()
      .then(datasets => {
        // console.log(datasets);
        this.datasets = datasets;
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
      // { text: text }
    );
  }
}