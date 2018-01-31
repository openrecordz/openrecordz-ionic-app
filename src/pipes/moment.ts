import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

// source : 
// https://medium.com/@ThulzMtetwa/using-moment-js-as-a-pipe-angular-or-ionic-b0a409f4fc04

/**
 * Generated class for the MomentPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'moment',
})
export class MomentPipe implements PipeTransform {
  transform(date, format) {
    return moment(date, "DD/MM/YYYY").lang("it").format(format);
  }
}
