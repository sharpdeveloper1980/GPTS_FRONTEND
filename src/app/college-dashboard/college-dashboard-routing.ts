
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchStudentsComponent } from './search-students/search-students.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ShortlistComponent } from './shortlist/shortlist.component';
import { InboundProcessComponent } from './inbound-process/inbound-process.component';
import { KnowledgeBlogComponent } from './knowledge-blog/knowledge-blog.component';
import { OppCreateSummerSchoolComponent } from './opp-create-summer-school/opp-create-summer-school.component';
import { OppScheduleNewComponent } from './opp-schedule-new/opp-schedule-new.component';
import { RatingsApplyComponent } from './ratings-apply/ratings-apply.component';
import { CollegeProfileComponent } from './college-profile/college-profile.component';
import { SelectionProgressComponent } from './selection-progress/selection-progress.component';

export const routes: Routes = [
    {
        path: '', component: IndexComponent, children: [
            { path: 'home', component: DashboardComponent },
            { path: 'search-students', component: SearchStudentsComponent },
            { path: 'search-result', component: SearchResultComponent },
            { path: 'shortlist', component: ShortlistComponent },
            { path: 'inbound-process', component: InboundProcessComponent },
            { path: 'knowledge-blog', component: KnowledgeBlogComponent },
            { path: 'opp-create-summer-school', component: OppCreateSummerSchoolComponent },
            { path: 'opp-schedule-new', component: OppScheduleNewComponent },
            { path: 'ratings-apply', component: RatingsApplyComponent },
            { path: 'college-profile', component: CollegeProfileComponent },
            { path: 'selection-process', component: SelectionProgressComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
        ]
    },

];

export const routing = RouterModule.forChild(routes);