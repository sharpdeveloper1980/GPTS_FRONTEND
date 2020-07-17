import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';
import { BreadcrumService } from '../../shared/services/breadcrum.service';


declare var $: any;

@Component({
  selector: 'app-coursepage-internal',
  templateUrl: './coursepage-internal.component.html',
  styleUrls: ['./coursepage-internal.component.scss']
})

export class CoursepageInternalComponent implements OnInit {
  courseSlug: String;
  careerName: String;
  careerBanner: String;
  careerAbout: String;
  careerIcon: String;
  careerVideo: Array<any> = [];
  careeVidConfig: any;
  showVideo: boolean = true;
  loggedIn: boolean;
  careerExam: Array<any> = [];
  careerPro: String;
  careerCon: String;
  salary: String;
  careerLadder: Array<any> = [];
  competencies: Array<any>;
  relatedCareer: Array<any>;
  futureProspect: String;
  areaCovered: Array<any>;
  careerJobs: Array<any>;
  psychology: String;
  userId: any = 0;
  stickyPosition: boolean = false
  stopScrollTop: any;
  removeSticky: boolean = false;
  routeInfo: string;
  arrayOfRoutes: Array<any> = [];
  numberOfRoutes: number;

  @ViewChild('parentContainer') parentContainer: ElementRef;
  @ViewChild('pageFooter') pageFooter: ElementRef;
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  @ViewChild('subCourseContainer') subCourseContainer: ElementRef;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute,
    private headerService: HeaderService, private breadcrum: BreadcrumService) { }

  ngOnInit() {
    document.body.classList.add("coursepage-internal-body");
    this.getUserInfo();
    this.getSubCareer();
    this.routeInfo = this.breadcrum.routeName;

    this.arrayOfRoutes = this.routeInfo.split("/");
    this.numberOfRoutes = this.arrayOfRoutes.length;
    
  }

  getSubCareer() {
    this.courseSlug = this.activatedRoute.snapshot.paramMap.get('subCourse');
    let data = {
      'user_id': this.userId,
      'slug': this.courseSlug
    }
    this.apiService.getSubCourse(data).subscribe(val => {
      val = val.data;
      this.careerAbout = val.about;
      this.careerBanner = val.career_banner;
      this.careerName = val.name;
      this.careerVideo = val.career_video;
      this.careerExam = val.career_entrance_exam;
      this.careerCon = val.cons;
      this.careerPro = val.pros;
      this.salary = val.salary;
      this.careerLadder = val.career_ladder;
      this.competencies = val.competencies;
      this.relatedCareer = val.related_career;
      this.futureProspect = val.future_prospect;
      this.areaCovered = val.area_cover;
      this.careerJobs = val.career_jobs;
      this.psychology = val.key_psychology;
      this.showVideo = true;
      setTimeout(() => {
        this.headerService.loaderFunction(false);
      }, 2000);
    },
      error => {
      });
  }

  openSignupModal() {
    $("#signupModal").modal('show');
  }

  getUserInfo() {
    this.headerService.userInfoLsObservable().subscribe(user => {
      if (typeof user != undefined && typeof user != 'string') {
        this.userId = user.user_id
        this.loggedIn = user.is_eligible_for_dashboard;
      }
    })
  };

  scrollTo(el) {
    let elTop = el.offsetTop - 63;
    window.scrollTo({
      top: elTop,
      behavior: 'smooth'
    });
  }

  changeUI(event) {
    this.stickyPosition = event;
  }


  stopScroll(event) {
    this.removeSticky = event;
    this.stopScrollTop = this.pageFooter.nativeElement.offsetTop - (this.scrollContainer.nativeElement.scrollHeight + 400);
    console.log(this.stopScrollTop);
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

  ngOnDestroy() {
    document.body.classList.remove("coursepage-internal-body");
  }
  makeLink(val, index) {
    if (val == this.arrayOfRoutes[index + 1]) {
      return '/' + val;
    } else {
      return '/' + this.arrayOfRoutes[index + 1] + '/' + val;
    }
  }

  getName(val: string) {
    return val.replace("-", " ");
  }
}
