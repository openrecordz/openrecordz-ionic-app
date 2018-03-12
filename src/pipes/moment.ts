import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

// Context
import { MyApp } from '../app/app.component';

// source : 
// https://medium.com/@ThulzMtetwa/using-moment-js-as-a-pipe-angular-or-ionic-b0a409f4fc04

@Pipe({
  name: 'moment',
})
export class MomentPipe implements PipeTransform {
  transform(date, format) {

    // return moment(date, "DD/MM/YYYY").lang("it").format(format);
    // return moment(date, "DD/MM/YYYY").lang(MyApp.appConfig.defaultLanguage).format(format);
      return moment(date).locale(MyApp.appConfig.defaultLanguage).format(format);
  }
}
