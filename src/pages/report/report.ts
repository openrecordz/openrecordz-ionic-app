import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  private todo: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public viewCtrl: ViewController) {
      this.todo = this.formBuilder.group({
        title: ['', Validators.required],
        description: [''],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');

    this.logForm();
  }

  logForm() {
    console.log(this.todo.value)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
