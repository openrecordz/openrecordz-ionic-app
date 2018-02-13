import { Component } from '@angular/core';

// pages
import { DatasetsListPage } from '../datasets-list/datasets-list';
import { CalendarPage } from '../calendar/calendar';
import { AboutPage } from '../about/about';
import { NotificationsHistoryPage } from '../notifications-history/notifications-history'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DatasetsListPage;
  tab2Root = CalendarPage;
  tab3Root = NotificationsHistoryPage;
  tab4Root = AboutPage;

  constructor() {

  }
}
