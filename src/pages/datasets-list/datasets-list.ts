import { Component } from '@angular/core';
import { NavController, NavParams /*,ModalController  */} from 'ionic-angular';

// providers
import { DatasetService } from '../../providers/dataset-service';
import { TranslateService } from '@ngx-translate/core';

// pages
import { RecordsListPage } from '../records-list/records-list';
import { SearchPage } from '../search/search';
// import { ReportPage } from '../report/report';

// context
import { MyApp } from '../../app/app.component';
import { BotPage } from '../bot/bot';

@Component({
  selector: 'page-datasets-list',
  templateUrl: 'datasets-list.html',
  // providers: [DatasetService]
})
export class DatasetsListPage {

  private datasets: any;
  showBtn: boolean = false;
  deferredPrompt;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private datasetService: DatasetService,
    private translate: TranslateService,
    // private modalCtrl: ModalController
  ) {

    // ########### begin translations ###########
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(MyApp.appConfig.defaultLanguage);
    translate.use(MyApp.appConfig.defaultLanguage)
    // ########### end translations ###########

    // this.loadDatasets();
  }


  ionViewWillEnter(){
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later on the button event.
      this.deferredPrompt = e;
       
    // Update UI by showing a button to notify the user they can add to home screen
      this.showBtn = true;
    });
     
    //button click event to show the promt
             
    window.addEventListener('appinstalled', (event) => {
     alert('App Installed');
    });
     
     
    if (window.matchMedia('(display-mode: standalone)').matches) {
      // alert('display-mode is standalone');
    }
  }

  add_to_home(e){
    debugger
    // hide our user interface that shows our button
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          // alert('User accepted the prompt');
        } else {
          // alert('User dismissed the prompt');
        }
        this.deferredPrompt = null;
      });
  };


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

  private openBotClick() {
    this.navCtrl.push(BotPage);
  }
  // private onSendReportClick() {
  //   console.log("DatasetsListPage.onSendReportClick");

  //   let contactModal = this.modalCtrl.create(ReportPage);
  //   contactModal.present();
  // }
}