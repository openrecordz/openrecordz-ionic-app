import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// providers
import { DatasetService } from '../../providers/dataset-service';

// pages
import { RecordsListPage } from '../records-list/records-list';
import { SearchPage } from '../search/search';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public datasetService: DatasetService) {
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