import { Component } from '@angular/core';

import { WorkDeskPage } from '../work-desk/work-desk';
import { WorkContactPage } from '../work-contact/work-contact'
import { WorkHomePage } from '../work-home/work-home'
import { WorkCommunityPage } from '../work-community/work-community'
import { WorkUsercenterPage } from '../work-usercenter/work-usercenter'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = WorkHomePage
  tab2Root = WorkContactPage
  tab3Root = WorkDeskPage
  tab4Root = WorkCommunityPage
  tab5Root = WorkUsercenterPage
  constructor() {
   
  }
}
