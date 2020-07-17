import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './student-dashboard-routing';

// Package module
import { SwiperModule } from 'ngx-swiper-wrapper';

//Packages
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { TagInputModule } from 'ngx-chips';

// custom modules 
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExperientialLearningComponent } from './experiential-learning/experiential-learning.component';
import { OneAppStatusComponent } from './one-app-status/one-app-status.component';
import { ScholarshipComponent } from './scholarship/scholarship.component';
import { MentorComponent } from './mentor/mentor.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { IndexTestComponent } from './index-test/index-test.component';
import { IndexComponent } from './index/index.component';
import { MustWatchComponent } from './must-watch/must-watch.component';
import { MyFavouriteVideoComponent } from './my-favourite-video/my-favourite-video.component';
import { TteComponent } from './tte/tte.component';
import { TteResultComponent } from './tte-result/tte-result.component';
import { CareerDiscoveryComponent } from './career-discovery/career-discovery.component';
import { MyFavVideosUpComponent } from './my-fav-videos-up/my-fav-videos-up.component';
import { ScholarshipStatusComponent } from './scholarship-status/scholarship-status.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { EmptyMustwatchComponent } from './empty-mustwatch/empty-mustwatch.component';
import { EmptyMyfavComponent } from './empty-myfav/empty-myfav.component';
import { NewstudentDashboardComponent } from './newstudent-dashboard/newstudent-dashboard.component';
import {AuthGuardService} from './auth-guard.service';
import { EdieoComponent } from './edieo/edieo.component';
import { EdieoDetailComponent } from './edieo-detail/edieo-detail.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    SharedModule,
    SlickCarouselModule,
    NgbModule,
    NgSelectModule,
    routing,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#f1e0e9s",
      animationDuration: 300,
    }),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    TagInputModule
  ],
  providers: [AuthGuardService],
  declarations: [DashboardComponent, 
    ExperientialLearningComponent, 
    OneAppStatusComponent, 
    ScholarshipComponent, 
    MentorComponent, 
    StudentProfileComponent, 
    IndexTestComponent, 
    IndexComponent, 
    MustWatchComponent, 
    MyFavouriteVideoComponent, 
    TteComponent, 
    TteResultComponent, 
    CareerDiscoveryComponent, 
    MyFavVideosUpComponent, 
    ScholarshipStatusComponent, 
    SearchResultComponent, 
    EmptyMustwatchComponent, 
    EmptyMyfavComponent, 
    NewstudentDashboardComponent, 
    EdieoComponent, EdieoDetailComponent,
    ],
  exports: [],
})
export class StudentDashboardModule implements OnInit {


  ngOnInit() {
    
  }
}
