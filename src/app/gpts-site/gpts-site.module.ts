import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// Package module
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


//Packages
import { NgCircleProgressModule } from 'ng-circle-progress';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { TagInputModule } from 'ngx-chips';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

// custom modules 
import { SharedModule } from '../shared/shared.module'
// components
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CareerLibraryCourseProfileComponent } from './career-library-course-profile/career-library-course-profile.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { FaqComponent } from './faq/faq.component';
import { PricingComponent } from './pricing/pricing.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { StudentsPageComponent } from './students-page/students-page.component';
import { SchoolProfilePageComponent } from './school-profile-page/school-profile-page.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { HomeTwoComponent } from './home-two/home-two.component';
import { UniversityComponent } from './dropdown/university/university.component';
import { HomeThreeComponent } from './home-three/home-three.component';
import { CareerlibraryComponent } from './careerlibrary/careerlibrary.component';
import { CareerlibraryRegisteredComponent } from './careerlibrary-registered/careerlibrary-registered.component';
import { CoursepagenewComponent } from './coursepagenew/coursepagenew.component';
import { IamStudentComponent } from './iam-student/iam-student.component';
import { CoursepageInternalComponent } from './coursepage-internal/coursepage-internal.component';
import { BloglistComponent } from './bloglist/bloglist.component';
import { BloginternalComponent } from './bloginternal/bloginternal.component';
import { DalhamComponent } from './dalham/dalham.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CareerComponent } from './career/career.component';
import { SfiComponent } from './sfi/sfi.component';
import { FeaturedinstituteComponent } from './featuredinstitute/featuredinstitute.component';
import { IaminstituteComponent } from './iaminstitute/iaminstitute.component';
import { CareerDiscoveryComponent } from './career-discovery/career-discovery.component';
import { PressmediaComponent } from './pressmedia/pressmedia.component';
import { CertifiedSchoolsComponent } from './certified-schools/certified-schools.component';
import { GliCertificationComponent } from './gli-certification/gli-certification.component';
import { CdapComponent } from './cdap/cdap.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DiscoverCollegesComponent } from './discover-colleges/discover-colleges.component';
import { RoychandraScholershipComponent } from './roychandra-scholership/roychandra-scholership.component';
import { GetdiscoverComponent } from './getdiscover/getdiscover.component';
import { DesignCollegeComponent } from './design-college/design-college.component';
import { NanoClassComponent } from './nano-class/nano-class.component';
import { EdieoComponent } from './edieo/edieo.component';
import { EdieoDetailComponent } from './edieo-detail/edieo-detail.component';
import { CityTourComponent } from './city-tour/city-tour.component';
import { MicroUniversityComponent } from './university/university.component';
import { HomeFourComponent } from './home-four/home-four.component';
import { HomeFiveComponent } from './home-five/home-five.component';
import { GreatChallengeComponent } from './great-challenge/great-challenge.component';
import { ExpertsComponent } from './experts/experts.component';
import { FaaartComponent } from './faaart/faaart.component';
import { UniversityListComponent } from './university-list/university-list.component';
import { FilterPipe } from '../filter.pipe';
import { OurSolutionComponent } from './our-solution/our-solution.component'
import {WebinarComponent} from './webinar/webinar.component';
import { SignupComponent } from './signup/signup.component';
import { SummerSchoolComponent } from './summer-school/summer-school.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    SharedModule,
    RouterModule,
    NgSelectModule,
    SlickCarouselModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#f1e0e9s",
      animationDuration: 300,
    }),
    ScrollToModule.forRoot(),
    NgbModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    TagInputModule,
    MalihuScrollbarModule.forRoot(),
  ],
  exports: [HomeComponent],
  declarations: [HomeComponent, AboutUsComponent, CareerLibraryCourseProfileComponent, ComparisonComponent, FaqComponent, PricingComponent, SearchResultComponent, UserSignupComponent, StudentsPageComponent, SchoolProfilePageComponent, CoursePageComponent, HomeTwoComponent, UniversityComponent, HomeThreeComponent, CareerlibraryComponent, CareerlibraryRegisteredComponent, CoursepagenewComponent, IamStudentComponent, CoursepageInternalComponent, BloglistComponent, BloginternalComponent, DalhamComponent, ContactusComponent, CareerComponent, SfiComponent, FeaturedinstituteComponent, IaminstituteComponent, CareerDiscoveryComponent, PressmediaComponent, CertifiedSchoolsComponent, GliCertificationComponent, CdapComponent, TermsComponent, PrivacyPolicyComponent, DiscoverCollegesComponent, RoychandraScholershipComponent, GetdiscoverComponent, DesignCollegeComponent, NanoClassComponent, EdieoComponent, EdieoDetailComponent, CityTourComponent,MicroUniversityComponent, HomeFourComponent, GreatChallengeComponent, ExpertsComponent, FaaartComponent,HomeFiveComponent, UniversityListComponent,FilterPipe, OurSolutionComponent,WebinarComponent, SignupComponent, SummerSchoolComponent]
})
export class GptsSiteModule { }
