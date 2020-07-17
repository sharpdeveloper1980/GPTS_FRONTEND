
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from './auth-guard.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NewstudentDashboardComponent } from './newstudent-dashboard/newstudent-dashboard.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { MentorComponent } from './mentor/mentor.component';
import { ExperientialLearningComponent } from './experiential-learning/experiential-learning.component';
import { ScholarshipComponent } from './scholarship/scholarship.component';
import { IndexTestComponent } from './index-test/index-test.component';
import { IndexComponent } from './index/index.component';
import { MustWatchComponent } from './must-watch/must-watch.component';
import { OneAppStatusComponent } from './one-app-status/one-app-status.component';
import { MyFavouriteVideoComponent } from './my-favourite-video/my-favourite-video.component';
import { CareerDiscoveryComponent } from './career-discovery/career-discovery.component';
import { MyFavVideosUpComponent } from './my-fav-videos-up/my-fav-videos-up.component';
import { ScholarshipStatusComponent } from './scholarship-status/scholarship-status.component';
import { TteResultComponent } from './tte-result/tte-result.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { EmptyMustwatchComponent } from './empty-mustwatch/empty-mustwatch.component';
import { EmptyMyfavComponent } from './empty-myfav/empty-myfav.component';
import { TteComponent } from './tte/tte.component';
import { EdieoComponent } from './edieo/edieo.component';
import { EdieoDetailComponent } from './edieo-detail/edieo-detail.component'


export const routes: Routes = [
    {
        path: '', component: IndexComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: DashboardComponent },
            { path: 'newstudent-dashboard', component: NewstudentDashboardComponent },
            { path: 'student-profile', component: StudentProfileComponent },
            { path: 'mentor', component: MentorComponent },
            { path: 'experiential-learning', component: ExperientialLearningComponent },
            { path: 'scholarship', component: ScholarshipComponent },
            { path: 'index-test', component: IndexTestComponent },
            { path: 'must-watch', component: MustWatchComponent },
            { path: 'one-app-status', component: OneAppStatusComponent },
            { path: 'my-favourite-video', component: MyFavouriteVideoComponent },
            { path: 'career-discovery', component: CareerDiscoveryComponent },
            { path: 'my-fav', component: MyFavVideosUpComponent },
            { path: 'scholarship-status', component: ScholarshipStatusComponent },
            { path: 'career-discovery-result', component: TteResultComponent, canActivate: [AuthGuardService] },
            { path: 'search-result', component: SearchResultComponent },
            { path: 'empty-mustwatch', component: EmptyMustwatchComponent },
            { path: 'empty-myfav', component: EmptyMyfavComponent },
            { path: 'career-discovery-test', component: TteComponent, canActivate: [AuthGuardService]},
            {path:'edieo', component:EdieoComponent},
            {path:'edieo-detail/:type/:id', component:EdieoDetailComponent},
            { path: '**', redirectTo: 'home', pathMatch: 'full' },
            
          
        ]
    },
];

export const routing = RouterModule.forChild(routes);