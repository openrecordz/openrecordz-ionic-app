import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-bot',
  templateUrl: 'bot.html',
})
export class BotPage {

    constructor() {
        console.log("bot");
    }

    ionViewDidLoad() {
        console.log("ionViewDidLoad");

        // window.tiledeskSettings = 
        // {
        //     projectid: "5ae1867d86724100146e1df5",
        //     projectname: "OpenRecordz.com",
        //     preChatForm: false,
        //     calloutTimer: 5
        // };


        // (function(d, s, id) {
        //     var js, fjs = d.getElementsByTagName(s)[0];
        //     if (d.getElementById(id)) return;
        //     js = d.createElement(s); js.id = id; //js.async=!0;
        //     js.src = "https://widget.tiledesk.com/tiledesk.js";
        //     fjs.parentNode.insertBefore(js, fjs);
        // }(document, 'script', 'tiledesk-jssdk'));


      }

}
