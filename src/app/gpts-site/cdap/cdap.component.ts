import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';

declare var $: any;

@Component({
  selector: 'app-cdap',
  templateUrl: './cdap.component.html',
  styleUrls: ['./cdap.component.scss']
})
export class CdapComponent implements OnInit {

  leadership: Array<any> = [];
  team: Array<any> = [];
  signedUp: boolean = false;
  loggedIn: boolean = false;
  homeVideoUrl: string = '';
  homeVideoThumb: string;

  constructor(private headerService: HeaderService, private apiService: ApiService, private route: Router) { }

  ngOnInit() {
    document.body.classList.add("cdap-body");
    this.getUserInfo();
    this.getOurTeam();
    this.getVideo()
  }

  getOurTeam() {
    this.apiService.getOurTeam().subscribe(val => {
      this.team = val.data.team;
      this.leadership = val.data.leadership;
    })
    setTimeout(() => {
      this.headerService.loaderFunction(false);
    }, 2000);
  }

  getVideo() {
    let data = {
      'type': 2
    };
    this.apiService.getHomeVideo(data).subscribe(val=>{
      this.homeVideoUrl = val.data.video;
      this.homeVideoThumb = val.data.video_thumb;
    });
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
    document.body.classList.remove("cdap-body");
  }

}
