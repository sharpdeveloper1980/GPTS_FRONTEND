import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';



declare var $: any;
@Component({
  selector: 'app-coursepagenew',
  templateUrl: './coursepagenew.component.html',
  styleUrls: ['./coursepagenew.component.scss']
})
export class CoursepagenewComponent implements OnInit, AfterViewInit {
  courseSlug: String;
  careerBanner: String;
  careerAbout: String = "";
  aboutLength: number = 500;
  careerIcon: String;
  careerVideo: Array<any> = [];
  subCareerList: Array<any> = [];
  subCareerListAll: Array<any> = [];
  showCareeer: string = 'View all';
  expVideo: Array<any>;
  doYouKnow: Array<any> = [];
  careerName: String;
  bannerTitle: String;
  careeVidConfig: any;
  showVideo: boolean = true;
  expVideoDes: String;
  expVideoName: String;
  loggedIn: boolean;
  show:number=8;
  signedUp: boolean = false;
  userId: any = 0;
  expThumb: string;
  contentLoaded: boolean = false;
  expVidThumb: string;
  videoToShow: number = 3;

  constructor(private activatedRoute: ActivatedRoute, public router: Router, private apiService: ApiService,
    private headerService: HeaderService) { }

  ngOnInit() {
    document.body.classList.add("coursepagenew-body");
    this.careeVidConfig = {
      grabCursor: true,
      slidesPerView: 'auto',
      direction: 'horizontal',
      speed: 500,
      spaceBetween: 25,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next-career',
        prevEl: '.swiper-button-prev-career',
      }
    };

    this.getUserInfo();
    this.activatedRoute.params.subscribe(val => {
      this.getCourseInfo();
    });
  }

  ngAfterViewInit() {}

  getCourseInfo() {
    this.courseSlug = this.activatedRoute.snapshot.paramMap.get('course');
    let data = {
      'user_id': this.userId,
      'slug': this.courseSlug
    }
    this.apiService.getCourseInfo(data).subscribe(val => {
      val = val.data;
      this.careerBanner = val.career_banner;
      this.careerAbout = val.about;
      this.expVideo = val.exp_video;
      this.expVidThumb = val.exp_video_thumb
      this.doYouKnow = val.do_you_know;
      this.careerIcon = val.career_icon;
      this.careerVideo = val.career_video;
      this.subCareerListAll = val.sub_career_list;
      //if (this.subCareerListAll.length > 8) {
       // this.subCareerList = this.subCareerListAll.slice(0, 8);
     // } else {
        this.subCareerList = this.subCareerListAll;
      //}
      this.careerName = val.name;
      this.bannerTitle = val.banner_title;
      this.showVideo = true;
      this.expVideoDes = val.exp_video_designation;
      this.expVideoName = val.exp_video_name;
      this.expThumb = val.exp_video_thumb;
      this.contentLoaded = true
      setTimeout(() => {
        this.headerService.loaderFunction(false);
      }, 2000);
    });
  }

  openSignupModal() {
    if (this.signedUp) {
      this.router.navigate(['/user-signup']);
    } else {
      $("#signupModal").modal('show');
    }
  }

  getUserInfo() {
    this.headerService.userInfoLsObservable().subscribe(user => {
      if (typeof user != undefined && typeof user != 'string') {
        this.userId = user.user_id;
        this.signedUp = true;
        this.loggedIn = user.is_eligible_for_dashboard;
      }
    });
  }

  addToFav(id, $event, fav) {
    let data = {
      "user_id": this.userId,
      "career_video_id": id,
      "type": "add"
    }
    let heartElement: HTMLElement = $event.currentTarget;

    if (heartElement.classList.contains('activeHeart')) {
      data.type = "delete";
      heartElement.classList.remove('activeHeart');
      this.apiService.addFavVideo(data).subscribe(val => {
        if (val.code != 200) {
          heartElement.classList.add('activeHeart');
        }
      });
    } else {
      heartElement.classList.add('activeHeart');
      this.apiService.addFavVideo(data).subscribe(val => {
        if (val.code != 200) {
          heartElement.classList.remove('activeHeart');
        }
      });
    }
  }

  allCareers() {
    if (this.subCareerList.length > 8) {
      this.subCareerList = this.subCareerListAll.slice(0, 8);
      this.showCareeer = 'View all';
    } else {
      this.subCareerList = this.subCareerListAll;
      this.showCareeer = 'Show less';
    }

  }

  checkLoggedIn($event) {
    if (!this.loggedIn) {
      $event.preventDefault();
      $event.stopPropagation();
      let vid = $event.currentTarget.querySelector('video');
      vid.pause();
      vid.src = vid.src;
      this.openSignupModal();
    } else {
      return;
    }
  }

  checkViewLess(aboutLength, content) {

  }

  ngOnDestroy() {
    document.body.classList.remove("coursepagenew-body");
  }

}
