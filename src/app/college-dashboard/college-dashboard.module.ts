import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './college-dashboard-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

// custom modules
import { SharedModule } from '../shared/shared.module';

// Package modules
import { Ng5SliderModule } from 'ng5-slider';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';

// Components
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

@NgModule({
  imports: [
    CommonModule,
    routing,
    TagInputModule,
    SharedModule,
    Ng5SliderModule,
    NgSelectModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
  declarations: [IndexComponent, DashboardComponent, SearchStudentsComponent, SearchResultComponent, ShortlistComponent, InboundProcessComponent, KnowledgeBlogComponent, OppCreateSummerSchoolComponent, OppScheduleNewComponent, RatingsApplyComponent, CollegeProfileComponent, SelectionProgressComponent]
 
})
export class CollegeDashboardModule { }
