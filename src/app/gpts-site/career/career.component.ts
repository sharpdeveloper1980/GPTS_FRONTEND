import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from "@angular/router";

import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';

declare var $: any;
@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
  providers: [NgbTabsetConfig]
})
export class CareerComponent implements OnInit {
  signedUp: boolean = false;
  loggedIn: boolean = false;
  openingShowJobs: Array<any> = [];
  location: Array<any> = [];
  deptname: Array<any> = [];
  filterLoc: string = '';
  filerDept: string = '';

  @ViewChild('content') content:ElementRef;

  constructor(private headerService: HeaderService, private route: Router, private apiService: ApiService,
    private modal:NgbModal) {
  }

  ngOnInit() {
    document.body.classList.add("career-body");
    this.getZohoOpening();
  }

  getUserInfo() {
    this.headerService.userInfoLsObservable().subscribe(user => {
      if (typeof user != undefined && typeof user != 'string') {
        this.signedUp = true;
        this.loggedIn = user.is_eligible_for_dashboard;
      }
    });
  }

  getZohoOpening() {
    let data = {
      "city_name": "",
      "position_name": ""
    }
    this.apiService.getZohoOpening(data).subscribe(val => {
      this.openingShowJobs = val.data;
      this.location = val.location;
      this.location = Object.keys(this.location).map(key => ({ type: key, value: this.location[key] }));
      this.deptname = val.deptname;
      this.deptname = Object.keys(this.deptname).map(key => ({ type: key, value: this.deptname[key] }));
       setTimeout(()=>{
        this.headerService.loaderFunction(false);
       }, 1000);
    });

  }

  filter(value, type) {

    if (type === 1) {
      this.filerDept = value;
    } else {
      this.filterLoc = value;
    }

    let data = {
      "city_name": this.filterLoc ,
      "position_name": this.filerDept
    }

    this.apiService.getZohoOpening(data).subscribe(val => {
      this.openingShowJobs = val.data;
    });
  }

  openUploadModal(){
    this.modal.open(this.content);
  }

  openSignupModal() {
    if (this.signedUp) {
      this.route.navigate(['/user-signup']);
    } else {
      $("#signupModal").modal('show');
    }
  }

  ngOnDestroy() {
    document.body.classList.remove("career-body");
  }

}
