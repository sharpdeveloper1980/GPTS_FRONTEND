import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import{ IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';



export const CounselorRoutes:Routes=[
    {
        path:'', component:IndexComponent, children:[
            {path:'', redirectTo:'home',pathMatch:'full'},
            {path:'home', component:DashboardComponent},
            {path:'**',redirectTo:'home', pathMatch:'full'}
        ]
    },
];


@NgModule({
    imports: [ RouterModule.forChild(CounselorRoutes)],
    exports: [RouterModule]
  })
  export class counselorRoutingModule { 
   
  }
  

//export const routing=RouterModule.forChild(CounselorRoutes);