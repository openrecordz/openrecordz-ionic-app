import { Component } from '@angular/core';

// pages
import { DatasetsListPage } from '../datasets-list/datasets-list';
import { CalendarPage } from '../calendar/calendar';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DatasetsListPage;
  tab2Root = CalendarPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
