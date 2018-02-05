import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// context
import { MyApp } from '../../app/app.component';

// providers
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TranslateService } from '@ngx-translate/core';

// pages
import { RecordDetailsPage } from '../record-details/record-details';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  private records: any;

   isFirstSearch : boolean ;
   hasResults : boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http,
    translate: TranslateService) {

    // ########### begin translations ###########
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(MyApp.appConfig.defaultLanguage);
    translate.use(MyApp.appConfig.defaultLanguage)
    // ########### end translations ###########
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');

    // var term = "*";
    // this.search(term).then(records => {
    //   console.log(records);
    //   this.records = records;
    // });

    this.isFirstSearch = true;
    console.log("isFirstSearch", this.isFirstSearch);
  
  }

  filter(ev: any) {

    let term = ev.target.value;

    // We will only perform the search if we have 3 or more characters
    if (term && term.trim() !== '' && term.trim().length > 3) { 
      this.search(term).then(records => {
        console.log(records);
        this.records = records;
        this.isFirstSearch = false;

        if (this.records && this.records.length > 0 ) {
          this.hasResults = true;
        } else {
          this.hasResults = false;
        }

        console.log("hasResults", this.hasResults);
        console.log("isFirstSearch", this.isFirstSearch);
      });
    }
  }

  search(searchParam: string) {
    var url = MyApp.appConfig.urlApi + "/search?text=" + searchParam +"&crossdomainsearch=false";
    console.log('SearchPage.search: url ==  ', url);

    return new Promise(resolve => {
      this.http.get(url)
        .map(res => res.json())
        .subscribe(results => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          // console.log(results)
          resolve(results);
        });
    });
  }

  onItemClicked(item) {
    // console.log(item.id + " item");

    // @TODO check if the result is a dataset, a binary or a record 

    var title = item.id;

    this.navCtrl.push(RecordDetailsPage,
      { record: item, title: title }
    );
  }
}
