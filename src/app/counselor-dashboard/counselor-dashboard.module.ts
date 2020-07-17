import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { counselorRoutingModule } from './counselor-dashboard-routing';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


// custom modules 
import { SharedModule } from '../shared/shared.module';
import{DashboardComponent} from './dashboard/dashboard.component';
import {IndexComponent} from './index/index.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination'



@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      SharedModule,
      ReactiveFormsModule,
      counselorRoutingModule,
      Ng2SearchPipeModule,
      NgxPaginationModule,
      Ng4LoadingSpinnerModule.forRoot()     
      
     ],
    providers: [],
    declarations: [
      DashboardComponent, 
      IndexComponent, 
      ],
    exports: [],
  })
  export class CounselorDashboardModule {  
  constructor(){
    console.log('counselor module loaded');
  }
    ngOnInit() {
      
    }
  }