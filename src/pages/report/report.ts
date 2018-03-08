import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, Events} from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

// context
import { MyApp } from '../../app/app.component';

// providers
import { MailgunProvider } from '../../providers/mailgun';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
  providers: [MailgunProvider]
})
export class ReportPage {
  private form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public viewCtrl: ViewController, 
    private mailgun: MailgunProvider,
    private translate: TranslateService,
    public alertCtrl: AlertController,
    public events: Events) {

    // ########### begin translations ###########
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(MyApp.appConfig.defaultLanguage);
    translate.use(MyApp.appConfig.defaultLanguage)
    // ########### end translations ###########

    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    // email not sent 
    this.events.subscribe('email-sent:false', (err) => {
      // console.log('error', err);
      this.promtEmailNotSent();
    });

    // email  sent
    this.events.subscribe('email-sent:true', (res) => {
      // console.log('response', res);
      this.promptEmailSent();
    });
  }

  private subtmitForm() {
    console.log(this.form.value);

    var context = this;

    let from = "stefano.depascalis@frontiere21.it";
    let to = "stefano.depascalis@frontiere21.it";

    var labelSubject = this.translate.get('page_report_email_template_subject_label')['value'];
     // console.log("labelSubject", labelSubject);
    var labelTitle = this.translate.get('page_report_email_template_label_title')['value'];
    // console.log("labelTitle", labelTitle);
     var dearUserLabel = this.translate.get('page_report_email_template_dear_user_label')['value'];
    // console.log("dearUserLabel", dearUserLabel);
    var labelMessage = this.translate.get('page_report_email_template_label_message')['value'];
    // console.log("labelMessage", labelMessage);
    var labelEmail = this.translate.get('page_report_email_template_label_email')['value'];
    // console.log("labelEmail", labelEmail);
    var labelPhone = this.translate.get('page_report_email_template_label_phone')['value'];
    // console.log("labelPhone", labelPhone);
    var labelPlace = this.translate.get('page_report_email_template_label_place')['value'];
    // console.log("labelPlace", labelPlace);
    var labelDescription = this.translate.get('page_report_email_template_label_description')['value'];
    // console.log("labelDescription", labelDescription);
    var labelGreetings = this.translate.get('page_report_email_template_label_greetings')['value'];
    // console.log("labelGreetings", labelGreetings);
    var labelDeveloper = this.translate.get('page_report_email_template_label_developer')['value'];
    // console.log("labelDeveloper", labelDeveloper);

    
    let TEMPLATE:string = "";
    let parametres = {
      "label_title": labelTitle,
      "dear_user_label" : dearUserLabel,
      "label_message": labelMessage,
      "label_email":  labelEmail, 
      "email": this.form.value.email,
      "label_phone": labelPhone,
      "phone": this.form.value.phone,
      "label_place" : labelPlace,
      "place" : this.form.value.address,
      "label_description": labelDescription,
      "description": this.form.value.description,
      "label_greetings" : labelGreetings,
      "label_developer": labelDeveloper,
      "developer":  MyApp.appConfig.developer
    };
    this.translate.get("page_report_email_template", parametres).subscribe((res:string) => {
        TEMPLATE += res;
    });    

    // send the email
    this.mailgun.send(
      from,
      to,
      labelSubject,
      TEMPLATE 
    );
 }

  private promptEmailSent() {
    var title = this.translate.get('page_report_alert_email_sent_title')['value'];
    var message = this.translate.get('page_report_alert_email_sent_message')['value'];
    var btnConfirm = this.translate.get('page_report_alert_email_btn_success')['value'];

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
          text: btnConfirm,
          handler: () => {
            alert.dismiss();
            this.dismiss();
          }
        }, ]
    });

    alert.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  private promptExample() {
    var title = this.translate.get('page_report_alert_example_title')['value'];
    var message = this.translate.get('page_report_alert_example_message')['value'];
    var btnConfirm = this.translate.get('page_report_alert_btn_confirm')['value'];

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [btnConfirm]
    });

    alert.present();
  }

  private promtEmailNotSent() {

    var title = this.translate.get('page_report_alert_email_not_sent_title')['value'];
    var message = this.translate.get('page_report_alert_email_not_sent_message')['value'];
    var btnConfirm = this.translate.get('page_report_alert_email_not_btn_success')['value'];

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
          text: btnConfirm,
          handler: () => {
            alert.dismiss();
            this.dismiss();
          }
        }, ]
    });

    alert.present();
  }
}

