import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component'

import { DashboardComponent } from './dashboard/dashboard.component';
import { RatingsComponent } from './ratings/ratings.component';
import { EventsNotificationComponent } from './events-notification/events-notification.component';
import { MentorComponent } from './mentor/mentor.component';
import { SchoolProfileComponent } from './school-profile/school-profile.component';

export const routes = [
    {
        path: '', component: IndexComponent, children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'ratings', component: RatingsComponent },
            { path: 'events-notification', component: EventsNotificationComponent },
            { path: 'profile', component: SchoolProfileComponent },
        ]
    }
]
export const routing = RouterModule.forChild(routes);