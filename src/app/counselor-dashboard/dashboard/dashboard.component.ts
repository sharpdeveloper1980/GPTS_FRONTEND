import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// import * as $ from 'jquery';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit{
  tteTestTaken: boolean;
  userId: any;
  profileStatus: string;
  studentName:string;
  contact_number: string;
  email_id: string;
  gender: string;
  userDetails: any;
  inspiringvideo: any;
  careerList:any;
  counselorData:{};
  p:number=1;
  counselorId:any;
  pdfUrl:any;
  students:Array<any>=[];
  public loading: boolean;
  @ViewChild('objectiveEl') objectiveEl: ElementRef;


  constructor(public apiService: ApiService,public headerService: HeaderService,public router: Router) {
   this.headerService.loaderFunction(true);

  }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('userGpts')).user_id;
    let userIdObj = {
      "user_id": this.userId
    }
    console.log('userId'+this.userId);
    this.apiService.ssoStatus(userIdObj).subscribe(val => {
      let status = val.data.status
      if (status != 3) {
        this.tteTestTaken = false;
       this.headerService.loaderFunction(false);
      } else {
        this.tteTestTaken = true;

       }
    });
    this.counselorList();
    //this.getPDF();
  }
  ngAfterViewInit() {
  }

  counselorList(){
    this.apiService.getCounselorList(this.userId).subscribe(val=>{
      this.counselorData = val.students;
      console.log(this.counselorData);
    });
}

getPDF(id){
  this.loading = true;
    this.apiService.counselorGetPdf(id).subscribe((res)=>{
     // this.pdfUrl = res.report;
   //  console.log(this.pdfUrl);
     setTimeout(function () {
      // For Firefox it is necessary to delay revoking the ObjectURL
      this.pdfUrl= res.report;
      let a = document.createElement('a')
a.href = this.pdfUrl
a.target   = '_blank';
a.download = this.pdfUrl.split('/').pop()
document.body.appendChild(a)
a.click()
document.body.removeChild(a)
this.loading = false;
  }.bind(this), 3000);


    });
}







}
