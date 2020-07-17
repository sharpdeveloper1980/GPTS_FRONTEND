import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { HeaderService } from '../../shared/services/header.service';
declare var $: any;
@Component({
  selector: 'app-career-discovery',
  templateUrl: './career-discovery.component.html',
  styleUrls: ['./career-discovery.component.scss']
})
export class CareerDiscoveryComponent implements OnInit {
  signedUp: boolean = false;
  loggedIn: boolean = false;
  constructor(private headerService: HeaderService, private route: Router) { }

  ngOnInit() {
    document.body.classList.add("careerDiscover-body");
    this.getUserInfo();
  }

  openSignupModal() {
    if (this.signedUp && this.loggedIn) {
      this.route.navigate(['/student-dashboard/TTE']);
    } else if (this.signedUp) {
      this.route.navigate(['/user-signup']);
    } else {
      $("#signupModal").modal('show');
    }
  }

  getUserInfo() {
    this.headerService.userInfoLsObservable().subscribe(user => {
      if (typeof user != undefined && typeof user != 'string') {
        this.signedUp = true;
        this.loggedIn = user.is_eligible_for_dashboard;

      }
    });
    setTimeout(() => {
      this.headerService.loaderFunction(false);
    });
  }

  ngOnDestroy() {
    document.body.classList.remove("careerDiscover-body");
  }

}
