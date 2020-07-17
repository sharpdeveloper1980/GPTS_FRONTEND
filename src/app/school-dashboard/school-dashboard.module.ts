import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './school-dashboard-routing';
// custom modules
import { SharedModule } from '../shared/shared.module';

// Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RatingsComponent } from './ratings/ratings.component';
import { EventsNotificationComponent } from './events-notification/events-notification.component';
import { MentorComponent } from './mentor/mentor.component';
import { SchoolProfileComponent } from './school-profile/school-profile.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule,
    NgbModule
  ],
  declarations: [IndexComponent, DashboardComponent, RatingsComponent, EventsNotificationComponent, SchoolProfileComponent, MentorComponent]
})


export class SchoolDashboardModule { }
