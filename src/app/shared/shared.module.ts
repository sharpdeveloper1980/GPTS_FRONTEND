import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule } from '@angular/router';
// Route
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderTwoComponent } from './header-two/header-two.component';

// Directive
import { OnlyNumberDirective } from '../shared/only-number.directive';
import { ScrollDetectDirective } from '../shared/scroll-detect.directive';

//Packages
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { QueryModalComponent } from './query-modal/query-modal.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    RouterModule,
    NgSelectModule,
    NgbModule,
    TagInputModule
  ],
  declarations: [HeaderComponent, FooterComponent, SidebarComponent, OnlyNumberDirective, ScrollDetectDirective,
    Error404Component, Error500Component, QueryModalComponent, BreadcrumbComponent,HeaderTwoComponent ],
  exports: [HeaderComponent, FooterComponent, SidebarComponent, OnlyNumberDirective,HeaderTwoComponent,
    ScrollDetectDirective, QueryModalComponent, BreadcrumbComponent]
})
export class SharedModule { }
