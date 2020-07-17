import { Routes, RouterModule } from '@angular/router';

// website pages
import { HomeComponent } from '../app/gpts-site/home/home.component';
import { HomeTwoComponent } from '../app/gpts-site/home-two/home-two.component';
import { HomeThreeComponent } from '../app/gpts-site/home-three/home-three.component';
import { HomeFourComponent } from '../app/gpts-site/home-four/home-four.component';
import { HomeFiveComponent } from '../app/gpts-site/home-five/home-five.component';
import { AboutUsComponent } from '../app/gpts-site/about-us/about-us.component';
import { CareerLibraryCourseProfileComponent } from '../app/gpts-site/career-library-course-profile/career-library-course-profile.component';
import { ComparisonComponent } from '../app/gpts-site/comparison/comparison.component';
import { FaqComponent } from '../app/gpts-site/faq/faq.component';
import { StudentsPageComponent } from '../app/gpts-site/students-page/students-page.component';
import { PricingComponent } from '../app/gpts-site/pricing/pricing.component';
import { SearchResultComponent } from '../app/gpts-site/search-result/search-result.component';
import { UserSignupComponent } from './gpts-site/user-signup/user-signup.component';
import { SchoolProfilePageComponent } from './gpts-site/school-profile-page/school-profile-page.component';
import { CoursePageComponent } from './gpts-site/course-page/course-page.component';
//import { UniversityComponent } from './gpts-site/dropdown/university/university.component';
import { CareerlibraryComponent } from './gpts-site/careerlibrary/careerlibrary.component';
import { CareerlibraryRegisteredComponent } from './gpts-site/careerlibrary-registered/careerlibrary-registered.component';
import { CoursepagenewComponent } from './gpts-site/coursepagenew/coursepagenew.component';
import { IamStudentComponent } from './gpts-site/iam-student/iam-student.component';
import { CoursepageInternalComponent } from './gpts-site/coursepage-internal/coursepage-internal.component';
import { Error404Component } from './shared/error404/error404.component';
import { Error500Component } from './shared/error500/error500.component';
import { BloglistComponent } from './gpts-site/bloglist/bloglist.component';
import { BloginternalComponent } from './gpts-site/bloginternal/bloginternal.component';
import { DalhamComponent } from './gpts-site/dalham/dalham.component';
import { ContactusComponent } from './gpts-site/contactus/contactus.component';
import { CareerComponent } from './gpts-site/career/career.component';
import { SfiComponent } from './gpts-site/sfi/sfi.component';
import { IaminstituteComponent } from './gpts-site/iaminstitute/iaminstitute.component';
import { FeaturedinstituteComponent } from './gpts-site/featuredinstitute/featuredinstitute.component';
import { CareerDiscoveryComponent } from './gpts-site/career-discovery/career-discovery.component';
import { PressmediaComponent } from './gpts-site/pressmedia/pressmedia.component';
import { CertifiedSchoolsComponent } from './gpts-site/certified-schools/certified-schools.component';
import { GliCertificationComponent } from './gpts-site/gli-certification/gli-certification.component';
import { CdapComponent } from './gpts-site/cdap/cdap.component';
import { TermsComponent } from './gpts-site/terms/terms.component';
import { PrivacyPolicyComponent } from './gpts-site/privacy-policy/privacy-policy.component';
import { DiscoverCollegesComponent } from './gpts-site/discover-colleges/discover-colleges.component';
import { RoychandraScholershipComponent } from './gpts-site/roychandra-scholership/roychandra-scholership.component';
import { GetdiscoverComponent } from './gpts-site/getdiscover/getdiscover.component';
import { DesignCollegeComponent } from './gpts-site/design-college/design-college.component';
import { NanoClassComponent } from './gpts-site/nano-class/nano-class.component';
import { EdieoComponent } from './gpts-site/edieo/edieo.component';
import { EdieoDetailComponent } from './gpts-site/edieo-detail/edieo-detail.component';
import { CityTourComponent } from './gpts-site/city-tour/city-tour.component';
import { MicroUniversityComponent } from './gpts-site/university/university.component';
import { GreatChallengeComponent } from './gpts-site/great-challenge/great-challenge.component';
import{ ExpertsComponent } from './gpts-site/experts/experts.component';
import { FaaartComponent } from './gpts-site/faaart/faaart.component';
import { UniversityListComponent } from './gpts-site/university-list/university-list.component';
import{OurSolutionComponent} from './gpts-site/our-solution/our-solution.component'
import {WebinarComponent} from './gpts-site/webinar/webinar.component';
import {SignupComponent} from './gpts-site/signup/signup.component';
import {SummerSchoolComponent} from './gpts-site/summer-school/summer-school.component';

const appRoutes: Routes = [
   // { path: 'home', component: HomeThreeComponent },
   { path: 'home', component: HomeFiveComponent },
//    {path:'home-five', component:HomeFiveComponent},
    // { path: 'home-three', component: HomeThreeComponent },
    { path: 'student-dashboard', loadChildren: './student-dashboard/student-dashboard.module#StudentDashboardModule' },
     //{ path: 'college-dashboard', loadChildren: './college-dashboard/college-dashboard.module#CollegeDashboardModule' },
    //{ path: 'school-dashboard', loadChildren: './school-dashboard/school-dashboard.module#SchoolDashboardModule' },
    {path:'counselor-dashboard', loadChildren:'./counselor-dashboard/counselor-dashboard.module#CounselorDashboardModule'},
    { path: 'about-us', component: AboutUsComponent },
    { path: 'career-course-profile', component: CareerLibraryCourseProfileComponent },
    // { path: 'comparison', component: ComparisonComponent },
    { path: 'faq', component: FaqComponent },
    // { path: 'pricing', component: PricingComponent },
    { path: 'search-result', component: SearchResultComponent },
    { path: 'user-signup', component: UserSignupComponent },
    { path: 'students-page', component: StudentsPageComponent },
    { path: 'institue-profile-page', component: SchoolProfilePageComponent },
    { path: 'course-page', component: CoursePageComponent },
    // { path: 'university', component: UniversityComponent },
    { path: 'careerlibrary', component: CareerlibraryComponent },
    // { path: 'careerlibrary-registered', component: CareerlibraryRegisteredComponent },
    { path: 'course/:course', component: CoursepagenewComponent },
    { path: 'iamstudent', component: IamStudentComponent },
    { path: 'course/:course/:subCourse', component: CoursepageInternalComponent },
    { path: 'error404', component: Error404Component },
    { path: 'error500', component: Error500Component },
    { path: 'bloglist', component: BloglistComponent },
    { path: 'bloglist/:blogName', component: BloginternalComponent },
    { path: 'dalham', component: DalhamComponent },
    //{ path: 'contactus', component: ContactusComponent },
    { path: 'career', component: CareerComponent },
    //{ path: 'sfiwebsite', component: SfiComponent },
    { path: 'iaminstitute', component: IaminstituteComponent },
    { path: 'featuredinstitute', component: FeaturedinstituteComponent },
   //{ path: 'featuredinstitute/:tab', component: FeaturedinstituteComponent },
    { path: 'careerdiscovery', component: CareerDiscoveryComponent },
    { path: 'pressmedia', component: PressmediaComponent },
    { path: 'edieo', component:EdieoComponent },
    { path: 'edieo-detail/:id', component:EdieoDetailComponent },
    { path: 'edieo-detail/:type/:id', component:EdieoDetailComponent },
    {path:'city-tour', component:CityTourComponent},
    {path: 'university/:id', component:MicroUniversityComponent},
    {path:'univeristy-list', component:UniversityListComponent},
    {path: 'great-challenge', component:GreatChallengeComponent},
    {path:'interview', component:ExpertsComponent},
    {path:'faaart', component:FaaartComponent},
    {path:'solution',component:OurSolutionComponent},
    {path:'knowledge-webinar', component:WebinarComponent},
    {path:'signup',component:SignupComponent},
    // { path: '', redirectTo: '/home', pathMatch: 'full' },
    //{ path: 'certifiedschool', component: CertifiedSchoolsComponent },
    //{ path: 'glicertification', component: GliCertificationComponent },
    //{ path: 'CDAP', component: CdapComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'privacy', component: PrivacyPolicyComponent },
    { path:'discover-colleges',component:DiscoverCollegesComponent},
    { path:'roychand-scholarship',component:RoychandraScholershipComponent},
    { path:'getdiscover',component:GetdiscoverComponent},
    { path:'design-college',component:DesignCollegeComponent},
    { path: 'nanoclass', component: NanoClassComponent },
    {path:'summer-school',component:SummerSchoolComponent},
    // page not found (always last)
    { path: '', component: HomeFiveComponent, pathMatch: 'full' },
    { path: '**', redirectTo: '/home' },

];

export const routing = RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'corrected' });