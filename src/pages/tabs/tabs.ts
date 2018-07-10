import { Component } from '@angular/core';
import { DatasetsListPage } from '../datasets-list/datasets-list';
import { CalendarPage } from '../calendar/calendar';
import { BotPage } from '../bot/bot';

import { AboutPage } from '../about/about';
import { NotificationsHistoryPage } from '../notifications-history/notifications-history'
import { ReportPage } from '../report/report';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DatasetsListPage;
  tab2Root = CalendarPage;
  // tabBot = BotPage;
  tab3Root = ReportPage;
  tab4Root = NotificationsHistoryPage;
  tab5Root = AboutPage;

  constructor() {
// console.log("tabbot",tabBot);
  }
}
