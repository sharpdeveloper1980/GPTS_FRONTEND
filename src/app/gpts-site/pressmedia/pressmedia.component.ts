import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { HeaderService } from '../../shared/services/header.service';

declare var $: any;

@Component({
  selector: 'app-pressmedia',
  templateUrl: './pressmedia.component.html',
  styleUrls: ['./pressmedia.component.scss']
})
export class PressmediaComponent implements OnInit {
  signedUp: boolean = false;
  loggedIn: boolean = false;

  constructor(public headerService: HeaderService, private route:Router) { }

  ngOnInit() {

    document.body.classList.add("pressmedia-body");
    setTimeout(() => {
      this.headerService.loaderFunction(false);
    });
    this.getUserInfo();
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
    document.body.classList.remove("pressmedia-body");
  }

}
