import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { HeaderService } from '../../shared/services/header.service';
declare var AOS: any;
declare var $: any;
@Component({
  selector: 'app-iaminstitute',
  templateUrl: './iaminstitute.component.html',
  styleUrls: ['./iaminstitute.component.scss']
})
export class IaminstituteComponent implements OnInit, AfterViewInit {
  loggedIn: boolean = false;
  signedUp: boolean = false;

  constructor(private headerService:HeaderService, private route: Router) { }

  ngOnInit() {
    // document.body.classList.add("iaminstitute-body");
    this.getUserInfo();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.headerService.loaderFunction(false);
      AOS.init();
    }, 2000);
  }

  getUserInfo() {
    this.headerService.userInfoLsObservable().subscribe(user => {
      if (typeof user != undefined && typeof user != 'string') {
        this.signedUp = true;
        this.loggedIn = user.is_eligible_for_dashboard;
      }
    });
  }

  openSignupModal() {
    if (this.signedUp) {
      this.route.navigate(['/user-signup']);
    } else {
      $("#signupModal").modal('show');
    }
  }

  ngOnDestroy() {
    // document.body.classList.remove("iaminstitute-body");
  }

}
