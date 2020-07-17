import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { HeaderService } from '../../shared/services/header.service';

declare var $: any;
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  cdapVar: boolean = true;
  sfiVar: boolean = false;
  signedUp: boolean = false;
  loggedIn: boolean = false;

  constructor(private headerService:HeaderService, private route:Router) { }

  ngOnInit() {
    document.body.classList.add("faq-body");
    setTimeout(() => {
      this.headerService.loaderFunction(false);
    }, 1000);
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
    document.body.classList.remove("faq-body");
  }

}
