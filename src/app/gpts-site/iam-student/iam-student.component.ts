import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';
declare var $: any;
declare var AOS: any;
@Component({
  selector: 'app-iam-student',
  templateUrl: './iam-student.component.html',
  styleUrls: ['./iam-student.component.scss']
})
export class IamStudentComponent implements OnInit, AfterViewInit {

  loggedIn: boolean;
  signedUp: boolean = false;
  homeVideoTitle: string;
  homeVideoUrl: string;
  homeVideoThumb: string;
  videoLoad: boolean = true;
  greatMindsArr: Array<any> = [];
  greatMindsArrVal: boolean = false;
  careerList: Array<any> = [];
  @ViewChild('homeVideo') homeVideo: ElementRef;
  @ViewChild('playIcon') playIcon: ElementRef;
  constructor(private headerService: HeaderService, public route: Router, private apiService: ApiService) { }

  ngOnInit() {
    document.body.classList.add("iamstudent-body");
    this.getUserInfo();
    let vidData = {
      "type": 3
    }
    this.apiService.getHomeVideo(vidData).subscribe(val => {
      this.homeVideoTitle = val.data.title;
      this.homeVideoUrl = val.data.video;
      this.homeVideoThumb = val.data.video_thumb;
      setTimeout(() => {
        this.headerService.loaderFunction(false);
        AOS.init();
      }, 2000);
      this.videoLoad = true;
    });
    this.apiService.getInspiringVideos().subscribe(val => {
      this.greatMindsArr = val.data.inspiringvideo;
      this.greatMindsArrVal = true;
    });
  }

  ngAfterViewInit() {
    this.apiService.getCareerList().subscribe(val => {
      this.careerList = val.data;
      console.log(this.careerList);
    })
  }

  openSignupModal() {
    if (this.signedUp) {
      this.route.navigate(['/user-signup']);
    } else {
      $("#signupModal").modal('show');
    }
  }

  goToCareerDiscover() {
    if (this.loggedIn && this.signedUp) {
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
  }

  playVideo() {
    let video = this.homeVideo.nativeElement;
    let playIcon = this.playIcon.nativeElement;
    if (video.paused) {
      playIcon.classList.add('hide');
      video.play();
    } else {
      playIcon.classList.remove('hide');
      video.pause();
    }
  }

  videoEnded(playIcon) {
    playIcon.classList.remove('hide');
  }

  goToCareer(event) {
    this.route.navigate(['/course', event]);
  }

  


  ngOnDestroy() {
    document.body.classList.remove("iamstudent-body");
  }

}
