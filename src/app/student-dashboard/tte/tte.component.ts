import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Router, ActivationEnd } from '@angular/router';

import { HeaderService } from '../../shared/services/header.service';
import { ConstantsService } from '../../shared/services/constants.service';

@Component({
  selector: 'app-tte',
  templateUrl: './tte1.component.html',
  styleUrls: ['./tte1.component.scss']
})
export class TteComponent implements OnInit, AfterViewInit {
  userDetails: any;
  tteRegisterVar: boolean = false;
  ssoStatus: boolean = false;
  ssoStatusVar: number;
  authUrl: string;
  ssoBttonText: string = '';
  termsVar: boolean = false;

  @ViewChild('termsElement') termsElement: ElementRef;
  constructor(private apiService: ApiService, public router: Router,
    public headerService: HeaderService, public constantsService: ConstantsService) {
    this.headerService.loaderFunction(true);
  }

  ngOnInit() {
    // this.headerService.dashboardHomeObservable().subscribe(val => {
    //   if (!val) {
    //     this.router.navigate(['student-dashboard', 'student-profile']);
    //   }
    // });

    this.userDetails = JSON.parse(localStorage.getItem('userGpts'));
    this.tteStatus(this.userDetails);
  }


  ngAfterViewInit() {

  }

  // To get status of the user
  tteStatus(user) {
    console.log(user.user_id);
    let data = {
      "user_id": user.user_id
    }
    this.apiService.ssoStatus(data).subscribe(val => {
      this.ssoStatusVar = val.data.status;
      console.log(this.ssoStatusVar);
      if (this.ssoStatusVar == 0) {
        this.tteRegisterVar = true;
        setTimeout(() => {
          this.headerService.loaderFunction(false);
        }, 500);
      } else if (this.ssoStatusVar == 1) {
        this.ssoStatus = true;
        this.ssoBttonText = 'Take Test';
        setTimeout(() => {
          this.headerService.loaderFunction(false);
        }, 500);
      } else if (this.ssoStatusVar == 2) {
        this.ssoStatus = true;
        this.ssoBttonText = 'Restart Test';
        this.authUrl = val.data.url;
        this.termsElement.nativeElement.checked = true;
        this.termsVar = true;
        setTimeout(() => {
          this.headerService.loaderFunction(false);
        }, 500);
      } else if (this.ssoStatusVar == 3) {
        this.router.navigate(['student-dashboard', 'career-discovery-result']);
      }

    });
  }

  // To create a new user in TTE
  tteNewUser(user) {
    $("#ttegetstarted").attr('disabled','disabled');
    $("#ttegetstarted").text('Please wait..');

    let userData = {
      "first_name": this.userDetails.name,
      "last_name": "",
      "email": this.userDetails.email,
      "user_id": this.userDetails.user_id
    }
    this.apiService.tteNewUser(userData).subscribe(val => {
      this.ssoStatus = true;
      this.tteRegisterVar = false;
      this.ssoBttonText = 'Take Test';
      this.tteTestRedirect();
    },
    error => {
      console.log(error);
    });
  }

  tteTestRedirect() {
    $("#ttetaketest").attr('disabled','disabled');
    $("#ttetaketest").text('Please wait..');

    let data = {
      "user_id": this.userDetails.user_id
    }
    this.apiService.tteSSO(data).subscribe(val => {
      console.log(val);
      this.authUrl = val.data.assessments[0].url;
      this.authUrl = this.authUrl + this.constantsService.redirectUrlTTe;
      this.authUrl = this.authUrl.replace(':3030', '')
      window.open(this.authUrl, "_blank");
    });
  }

  termsCheck(event) {
    if (event.target.checked) {
      this.termsVar = true;
    } else {
      this.termsVar = false;
    }
  }
}


